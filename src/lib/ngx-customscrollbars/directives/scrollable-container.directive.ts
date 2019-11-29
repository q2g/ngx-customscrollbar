import { Directive, NgZone, Host, ElementRef, OnDestroy, OnInit, AfterViewChecked, AfterViewInit, Input, Renderer2 } from "@angular/core";
import { ViewportControl } from "../provider/viewport.control";
import { HtmlViewport } from "../viewport/html.viewport";
import { Subject, fromEvent } from "rxjs";
import { filter, takeUntil, delay, distinctUntilChanged } from "rxjs/operators";

interface ContainerScrollSize {
    scrollHeight: number;
    scrollWidth: number;
}

enum CHANGE_DETECTION_STRATEGY {
    CHECKED  = "checked", // change detection
    INPUT    = "input",
    MUTATION = "mutation"
}

/**
 * directive for html elements
 * this will wrap the html element into HtmlViewport
 */
@Directive({
    selector: "[ngxCustomScrollbarScrollable]",
    exportAs: "ngxCustomScrollbarHTMLViewport"
})
export class NgxCustomScrollbarScrollableDirective implements AfterViewInit, AfterViewChecked, OnDestroy, OnInit {

    private htmlViewport: HtmlViewport;

    private scrollSize: ContainerScrollSize;

    private update$: Subject<ContainerScrollSize> = new Subject();

    private changeDetection: CHANGE_DETECTION_STRATEGY = CHANGE_DETECTION_STRATEGY.CHECKED;

    private destroyed$: Subject<boolean> = new Subject();

    private oldScrollDimension = null;

    constructor(
        @Host() private viewportControl: ViewportControl,
        private zone: NgZone,
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    @Input("ngxCustomScrollbarScrollable")
    public set changeDetectionStrategy(strategy: CHANGE_DETECTION_STRATEGY) {
        if (strategy) {
            this.changeDetection = strategy;
        }
    }

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, "ngx-customscrollbar--html-viewport");
        this.update$.pipe(
            distinctUntilChanged(),
            delay(100),
            filter((newSize) => {
                const hasChanged = JSON.stringify(newSize) !== JSON.stringify(this.scrollSize);
                this.scrollSize = newSize;
                return hasChanged;
            }),
            takeUntil(this.destroyed$)
        ).subscribe({
            next: () => this.viewportControl.update()
        });

        switch (this.changeDetection) {
            case CHANGE_DETECTION_STRATEGY.INPUT:
                this.initInputChangeDetection();
                break;
        }
    }

    ngAfterViewChecked() {
        if (this.changeDetection === CHANGE_DETECTION_STRATEGY.CHECKED) {
            const newScrollDimension = this.getScrollDimension();
            if (this.oldScrollDimension && JSON.stringify(this.oldScrollDimension) === JSON.stringify(newScrollDimension)) {
                return;
            }
            this.oldScrollDimension = newScrollDimension;
            this.update$.next(newScrollDimension);
        }
    }

    /**
     * if component gets destroyed tell our control we gets destroyed
     * and remove from dom mutations
     *
     * @memberof ScrollableContainerDirective
     */
    ngOnDestroy() {
        this.htmlViewport.destroy();
        this.viewportControl = null;
        this.update$.complete();
        this.update$ = null;

        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.destroyed$ = null;
    }

    /**
     * start watching the dom after view has been initialized
     * this ensures initial data has allready been set.
     *
     * We only want to know if we add or remove some items
     *
     * @memberof ScrollableContainerDirective
     */
    ngAfterViewInit(): void {
        this.scrollSize   = this.getScrollDimension();
        this.htmlViewport = new HtmlViewport(this.zone, this.el.nativeElement);
        this.viewportControl.viewPort = this.htmlViewport;
    }

    /**
     * get scroll dimensions
     */
    private getScrollDimension(): ContainerScrollSize {
        return {
            scrollHeight: this.el.nativeElement.scrollHeight,
            scrollWidth: this.el.nativeElement.scrollWidth
        };
    }

    private initInputChangeDetection() {
        fromEvent(this.el.nativeElement, "input")
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
                next: () => this.update$.next(this.getScrollDimension())
            });
    }
}
