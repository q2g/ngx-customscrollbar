import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Scrollbar } from '../api/scrollbar.interface';
import { WindowResize } from './window-resize';
import { DomHelper } from '../helper/dom.helper';
import { ScrollContainerMeasureModel } from '../model/scroll-container-measure.model';

/**
 * viewport contol service, the glue between scrollbars and the viewport
 */
@Injectable()
export class ViewportControl implements OnDestroy {

    private viewportUpdate$: Subject<Scrollbar.Event>;

    private viewportReady$: ReplaySubject<ScrollContainerMeasureModel>;

    private destroy$: Subject<boolean> = new Subject();

    private scrollSub: Subscription;

    private scrollbarViewPort: Scrollbar.IScrollbarViewport;
    private scrollPosition = {
        vertical: 0,
        horizontal: 0
    };

    private viewportModel: ScrollContainerMeasureModel;

    private _disabled: boolean;

    public constructor(
        private resize: WindowResize
    ) {
        this.viewportUpdate$ = new Subject();
        this.viewportReady$ = new ReplaySubject(1);

        this.registerEvents();
    }

    /**
     * inject the viewport which should be scrolled
     */
    public set viewPort(viewPort: Scrollbar.IScrollbarViewport) {

        if (this.scrollbarViewPort && this.scrollbarViewPort === viewPort) {
            return;
        }

        if (this.scrollSub) {
            this.scrollSub.unsubscribe();
        }

        this.scrollbarViewPort = viewPort;
        this.scrollSub = this.scrollbarViewPort.onScrolled()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.onScrolled();
            });

        this.scrollbarViewPort.control = this;


        /** create new viewport model if a viewport has been bound */
        this.viewportModel = new ScrollContainerMeasureModel(this.scrollbarViewPort.measureSize());
        this.viewportReady$.next(this.viewportModel);

        this.scrollbarViewPort.init();
    }

    public get viewportDimension(): DomHelper.IScrollContainerMeasure {
        return this.viewportModel.measures;
    }

    public get disabled(): boolean {
        return this._disabled || false;
    }

    /**
     * scroll page by specific amount
     * move this to helper
     */
    public scrollPage(direction: number) {
        const pageSize = this.viewportDimension.height;
        const scrollTop = this.viewportDimension.scrollTop + pageSize * direction;
        this.scrollTo(this.sanitizeScrollPosition({ left: 0, top: scrollTop }));
    }

    /** not called if i just reload this */
    ngOnDestroy(): void {
        this.scrollbarViewPort.destroy();

        this.destroy$.next(true);
        this.viewportReady$.complete();
        this.viewportUpdate$.complete();
        this.destroy$.complete();
        this.viewportModel = null;
    }

    /**
     * returns observable to get notified if viewport
     * has been changed in scroll or has been refreshed
     */
    public onUpdate(): Observable<Scrollbar.Event | Scrollbar.ScrollEvent> {
        return this.viewportUpdate$.asObservable();
    }

    public onLoad(): Observable<ScrollContainerMeasureModel> {
        return this.viewportReady$.asObservable();
    }

    /**
     * viewport was changed, this could happen if new content, or window has been resized
     * has been added or removed
     */
    public update() {
        /** update model size */
        this.viewportModel.setMeasures(this.scrollbarViewPort.measureSize());
        this.emitUpdate({ type: Scrollbar.VIEWPORT_EVENT.UPDATE });
    }

    /**
     * viewport should scroll by specific amount
     */
    public scrollTo(scrolledTo) {
        this.scrollbarViewPort.scrollTo(this.sanitizeScrollPosition(scrolledTo));
    }

    /**
     * scroll viewport to origin
     */
    public reset() {
        this.scrollTo({
            top: 0,
            left: 0
        });
    }

    public disableScroll(disabled: boolean) {
        this._disabled = disabled;
    }

    private registerEvents() {
        this.resize.onChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.update());
    }

    /**
     * viewport has been scrolled
     */
    private onScrolled() {

        const scrolled = this.scrollbarViewPort.scrolledOffset;
        const scrolledY = this.scrollPosition.vertical !== scrolled.top;
        const scrolledX = this.scrollPosition.horizontal !== scrolled.left;

        // update model to set current scroll offsets
        this.viewportModel.scrollLeft = scrolled.left;
        this.viewportModel.scrollTop = scrolled.top;

        this.emitUpdate({
            scrolledY,
            scrolledX,
            type: Scrollbar.VIEWPORT_EVENT.SCROLLED
        });

        this.scrollPosition.vertical = scrolled.top;
        this.scrollPosition.horizontal = scrolled.left;
    }

    /**
     * emits an update event through viewportUpdate observable
     */
    private emitUpdate(event: Scrollbar.Event | Scrollbar.ScrollEvent) {
        this.viewportUpdate$.next(event);
    }

    /**
     * sanitize scroll position to ensure we not scroll over the bounds
     */
    private sanitizeScrollPosition(scrollTo: Scrollbar.IOffset) {
        const scrollMaxY = this.viewportModel.scrollHeight - this.viewportModel.height;
        const scrollMaxX = this.viewportModel.scrollWidth - this.viewportModel.width;
        const { top, left } = scrollTo;

        return {
            top: top < 0 ? 0 : top > scrollMaxY ? scrollMaxY : top,
            left: left < 0 ? 0 : left > scrollMaxX ? scrollMaxX : left,
        };
    }
}
