import { Directive, NgZone, Host, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewportControl } from '../provider/viewport.control';
import { DomHelper } from '../helper/dom.helper';
import { HtmlViewport } from '../viewport/html.viewport';
import { DomMutationWatcher, IDomWatcher, TextAreaWatcher } from '../watcher';

/**
 * directive for html elements
 * this will wrap the html element into HtmlViewport
 * react on dom changes and updates scrollbar
 */
@Directive({
    selector: '[ngxCustomScrollbarScrollable]',
})
export class NgxCustomScrollbarScrollableDirective implements AfterViewInit, OnDestroy {

    private htmlViewport: HtmlViewport;
    private watcher: IDomWatcher;

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
        this.watcher.disconnect();

        this.viewportControl = null;
        this.watcher = null;
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
        this.htmlViewport = new HtmlViewport(this.zone);
        this.htmlViewport.element = this.el.nativeElement;
        this.viewportControl.viewPort = this.htmlViewport;

        if (this.el.nativeElement.tagName === 'TEXTAREA') {
            this.watcher = new TextAreaWatcher(this.viewportControl);
        } else {
            this.watcher = new DomMutationWatcher(this.viewportControl);
        }

        this.watcher.connect(this.el.nativeElement);
    }
}
