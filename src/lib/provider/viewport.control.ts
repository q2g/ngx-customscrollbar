import { Injectable } from '@angular/core';
import { Scrollbar } from '../api/scrollbar.interface';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { DomHelper } from '../helper/dom.helper';
import { ScrollContainerMeasureModel } from '../model/scroll-container-measure.model';

/**
 * viewport contol service, the glue between scrollbars and the viewport
 *
 * @export
 * @class ViewportControl
 */
@Injectable()
export class ViewportControl {

    private viewportUpdate$: Subject<Scrollbar.Event>;

    private viewportReady$: ReplaySubject<ScrollContainerMeasureModel>;

    private scrollbarViewPort: Scrollbar.IScrollbarViewport;
    private scrollPosition = {
        vertical: 0,
        horizontal: 0
    };

    private viewportModel: ScrollContainerMeasureModel;

    /**
     *Creates an instance of ScrollbarService.
     * @memberof ScrollbarService
     */
    public constructor() {
        this.viewportUpdate$ = new Subject();
        this.viewportReady$  = new ReplaySubject(1);
    }

    /**
     * inject the viewport which should be scrolled
     *
     * @memberof ScrollbarService
     */
    public set viewPort(viewPort: Scrollbar.IScrollbarViewport) {

        this.scrollbarViewPort = viewPort;
        this.scrollbarViewPort.onScrolled().subscribe(() => {
            this.onScrolled();
        });

        /** create new viewport model if a viewport has been bound */
        this.viewportModel = new ScrollContainerMeasureModel(viewPort.measureSize());

        this.scrollbarViewPort.control = this;
        this.viewportReady$.next(this.viewportModel);
    }

    /**
     * scroll page by specific amount
     * move this to helper
     *
     * @param {number} direction
     * @memberof ViewportControl
     */
    public scrollPage(direction: number) {
        const pageSize = this.viewportDimension.height;
        const scrollTop = this.viewportDimension.scrollTop + pageSize * direction;
        this.scrollTo(this.sanitizeScrollPosition({left: 0, top: scrollTop}));
    }

    /**
     * could be cached
     *
     * @readonly
     * @type {Scrollbar.IViewportDimension}
     * @memberof ViewportControl
     */
    public get viewportDimension(): DomHelper.IScrollContainerMeasure {
        return this.viewportModel.measures;
    }

    /**
     * returns observable to get notified if viewport
     * has been changed in scroll or has been refreshed
     *
     * @returns {Observable<Scrollbar.ViewportUpdateData>}
     * @memberof ViewportControl
     */
    public onUpdate(): Observable<Scrollbar.Event | Scrollbar.ScrollEvent> {
        return this.viewportUpdate$.asObservable();
    }

    public onLoad(): Observable<ScrollContainerMeasureModel> {
        return this.viewportReady$.asObservable();
    }

    /**
     * viewport was changed, this could happen if new content
     * has been added or removed
     *
     * @memberof ViewportControl
     */
    public update() {
        /** update model size */
        this.viewportModel.setMeasures(this.scrollbarViewPort.measureSize());
        this.emitUpdate({type: Scrollbar.VIEWPORT_EVENT.UPDATE});
    }

    /**
     * viewport should scroll by specific amount
     *
     * @param {number} left
     * @param {number} top
     * @memberof ViewportControl
     */
    public scrollTo(scrolledTo) {
        this.scrollbarViewPort.scrollTo(this.sanitizeScrollPosition(scrolledTo));
    }

    /**
     * scroll viewport to origin
     *
     * @memberof ScrollbarService
     */
    public reset() {
        this.scrollTo({
            top: 0,
            left: 0
        });
    }

    /**
     * viewport has been scrolled
     *
     * @private
     * @memberof ViewportControl
     */
    private onScrolled() {

        const scrolled  = this.scrollbarViewPort.scrolledOffset;
        const scrolledY = this.scrollPosition.vertical   !== scrolled.top;
        const scrolledX = this.scrollPosition.horizontal !== scrolled.left;

        // update model to set current scroll offsets
        this.viewportModel.scrollLeft = scrolled.left;
        this.viewportModel.scrollTop  = scrolled.top;

        this.emitUpdate({
            scrolledY,
            scrolledX,
            type: Scrollbar.VIEWPORT_EVENT.SCROLLED
        });

        this.scrollPosition.vertical   = scrolled.top;
        this.scrollPosition.horizontal = scrolled.left;
    }

    /**
     * emits an update event through viewportUpdate observable
     *
     * @private
     * @param {Scrollbar.VIEWPORT_EVENT} type
     * @memberof ViewportControl
     */
    private emitUpdate(event: Scrollbar.Event | Scrollbar.ScrollEvent) {
        this.viewportUpdate$.next(event);
    }

    /**
     * sanitize scroll position to ensure we not scroll over the bounds
     *
     * @private
     * @param {number} top
     * @returns {number}
     * @memberof ViewportControl
     */
    private sanitizeScrollPosition(scrollTo: Scrollbar.IOffset) {
        const scrollMaxY = this.viewportModel.scrollHeight - this.viewportModel.height;
        const scrollMaxX = this.viewportModel.scrollWidth  - this.viewportModel.width;
        const {top, left} = scrollTo;

        return {
            top:  top < 0 ? 0  : top > scrollMaxY ? scrollMaxY : top,
            left: left < 0 ? 0 : left > scrollMaxX ? scrollMaxX : left,
        };
    }
}
