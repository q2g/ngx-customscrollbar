import { Subject, fromEvent } from "rxjs";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
import { debounceTime, takeUntil } from "rxjs/operators";
import { IDomObserver } from "../../api/dom-observer.interface";
import { IViewportControl } from "../../api/viewport-control.interface";

/**
 * watches a textarea field for input changes
 * and notfiy viewportcontrol to update
 */
export class InputObserver implements IDomObserver {

    private destroyed$: Subject<boolean> = new Subject();

    public constructor(
        private viewportControl: IViewportControl
    ) { }

    connect(el: HTMLInputElement): void {
        fromEvent(el, "input").pipe(
            debounceTime(0, animationFrame),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.viewportControl.update());
    }

    disconnect() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
