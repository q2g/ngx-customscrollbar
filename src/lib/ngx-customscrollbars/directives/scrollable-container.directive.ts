import { Directive, NgZone, Host, ElementRef, OnDestroy, OnInit, AfterViewChecked, AfterViewInit } from "@angular/core";
import { ViewportControl } from "../provider/viewport.control";
import { HtmlViewport } from "../viewport/html.viewport";
import { Subject, Subscription, timer } from "rxjs";
import { delay, debounceTime, filter, tap } from "rxjs/operators";

interface ContainerScrollSize {
    scrollHeight: number;
    scrollWidth: number;
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

    private updateSub: Subscription;

    constructor(
        @Host() private viewportControl: ViewportControl,
        private zone: NgZone,
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.updateSub = this.update$.pipe(
            filter((newSize) => {
                const hasChanged = JSON.stringify(newSize) !== JSON.stringify(this.scrollSize);
                this.scrollSize = newSize;
                return hasChanged;
            }),
        ).subscribe({
            next: () => this.viewportControl.update()
        });
    }

    ngAfterViewChecked() {
        /** this will trigger change detection ? */
        this.update$.next(this.getScrollDimension());
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
        this.updateSub.unsubscribe();
        this.update$.complete();
        this.update$ = null;
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
}
