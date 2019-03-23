import { Subject, fromEvent, Observable } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ViewportControl } from '../provider/viewport.control';
import { IDomWatcher } from './dom.watcher.interface';

/**
 * watches a textarea field for input changes
 * and notfiy viewportcontrol to update
 */
export class TextAreaWatcher implements IDomWatcher {

    private destroyed$: Subject<boolean> = new Subject();

    public constructor(
        private viewportControl: ViewportControl
    ) { }

    connect(el: HTMLTextAreaElement): void {
        fromEvent(el, 'input').pipe(
            debounceTime(0, animationFrame),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.viewportControl.update());
    }

    disconnect() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
