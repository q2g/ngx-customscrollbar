import { ViewContainerRef, TemplateRef, Host, DoCheck, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Scrollbar } from '../api/scrollbar.interface';
import { DomHelper } from '../helper/dom.helper';
import { Overflow } from '../model/overflow';
import { ViewportControl } from '../provider/viewport.control';

/**
 * remove component if we dont need to scroll anymore, and
 * show it again if we can scroll. Same as css overflow: auto
 */
export abstract class NgxCustomScrollbarOverflow implements DoCheck, OnDestroy, OnInit {

    protected overflow: Overflow = Overflow.SCROLL;

    private isViewportVisible = false;
    private needsUpdate: boolean;
    private destroyed$: Subject<boolean>;

    constructor(
        /** The view container to add items to. */
        private viewContainerRef: ViewContainerRef,
        /** The template to use when stamping out new items. */
        private template: TemplateRef<any>,
        /** viewport control to bound */
        @Host() protected viewportController: ViewportControl,
        private changeDetector: ChangeDetectorRef
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
        this.viewportController.onLoad().pipe(
            tap(() => this.checkScrollbarNeedsUpdate()),
            switchMap(() => this.viewportController.onUpdate()),
            takeUntil(this.destroyed$)
        ).subscribe((updateEvent) => {
            const event = updateEvent.type;
            const checkUpdate = event === Scrollbar.VIEWPORT_EVENT.UPDATE;

            if (checkUpdate) {
                this.checkScrollbarNeedsUpdate();
            }
        });
    }

    protected abstract hasOverflow(dimensions: DomHelper.IScrollContainerMeasure): boolean;

    /**
     * check for updates on scrollbar
     */
    protected checkScrollbarNeedsUpdate() {

        let isOverflow: boolean;

        switch (this.overflow) {
            case Overflow.NONE: isOverflow = false; break;
            case Overflow.SCROLL: isOverflow = true; break;
            default: isOverflow = this.hasOverflow(this.viewportController.viewportDimension);
        }

        this.needsUpdate = isOverflow !== this.isViewportVisible;
        this.isViewportVisible = isOverflow;

        if (this.needsUpdate) {
            this.changeDetector.detectChanges();
        }
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
