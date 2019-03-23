import { Directive, NgZone, Host, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewportControl } from '../provider/viewport.control';
import { HtmlViewport } from '../viewport/html.viewport';

/**
 * directive for html elements
 * this will wrap the html element into HtmlViewport
 * react on dom changes and updates scrollbar
 */
@Directive({
    selector: '[ngxCustomScrollbarScrollable]',
    exportAs: 'ngxCustomScrollbarHTMLViewport'
})
export class NgxCustomScrollbarScrollableDirective implements AfterViewInit, OnDestroy {

    private htmlViewport: HtmlViewport;

    constructor(
        @Host() private viewportControl: ViewportControl,
        private zone: NgZone,
        private el: ElementRef
    ) { }

    /**
     * if component gets destroyed tell our control we gets destroyed
     * and remove from dom mutations
     *
     * @memberof ScrollableContainerDirective
     */
    ngOnDestroy() {
        this.htmlViewport.destroy();
        this.viewportControl = null;
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
        this.htmlViewport = new HtmlViewport(this.zone, this.el.nativeElement);
        this.viewportControl.viewPort = this.htmlViewport;
    }
}
