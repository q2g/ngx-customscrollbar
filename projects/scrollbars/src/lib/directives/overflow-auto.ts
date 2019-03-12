import { ViewContainerRef, TemplateRef, Host, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { ViewportControl } from '../provider/viewport.control';
import { Scrollbar } from '../api/scrollbar.interface';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomHelper } from '../helper/dom.helper';

/**
 * remove component if we dont need to scroll anymore, and
 * show it again if we can scroll. Same as css overflow: auto
 */
export abstract class NgxCustomScrollbarOverflowAuto implements DoCheck, OnDestroy, OnInit {

    private isViewportVisible = false;
    private needsUpdate: boolean;
    private destroyed$: Subject<boolean>;

    constructor(
        /** The view container to add items to. */
        private viewContainerRef: ViewContainerRef,
        /** The template to use when stamping out new items. */
        private template: TemplateRef<any>,
        /** viewport control to bound */
        @Host() private viewportController: ViewportControl
    ) {
        this.needsUpdate = false;
        this.destroyed$ = new Subject();
    }

    /**
     * angular change detection hook
     */
    ngDoCheck() {
        if (this.needsUpdate) {
            this.toggleScrollbar();
        }
        this.needsUpdate = false;
    }

    /**
     * scrollbar gets destroyed
     */
    ngOnDestroy() {
        this.destroyed$.next(true);
    }

    /**
     * register on viewportControl onUpdate event
     * and check scrollbar for visibility
     */
    ngOnInit() {
        this.viewportController.onLoad()
            .pipe(
                tap(() => this.checkScrollbarNeedsUpdate()),
                switchMap(() => this.viewportController.onUpdate()),
                takeUntil(this.destroyed$)
            )
            .subscribe((updateEvent) => {
                const event = updateEvent.type;
                let checkUpdate = false;
                checkUpdate = checkUpdate || event === Scrollbar.VIEWPORT_EVENT.UPDATE;

                if (checkUpdate) {
                    this.checkScrollbarNeedsUpdate();
                }
            });
    }

    protected abstract hasOverflow(dimensions: DomHelper.IScrollContainerMeasure): boolean;

    /**
     * check for updates on scrollbar
     */
    protected checkScrollbarNeedsUpdate(): boolean {
        const isOverflow = this.hasOverflow(this.viewportController.viewportDimension);
        this.needsUpdate = isOverflow !== this.isViewportVisible;
        this.isViewportVisible = isOverflow;
        return this.needsUpdate;
    }

    /**
     * toggle scrollbar visibility, clears viewport
     * if scrollbar should be hidden now
     */
    private toggleScrollbar() {

        if (this.isViewportVisible) {
            this.viewContainerRef.createEmbeddedView(this.template);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
