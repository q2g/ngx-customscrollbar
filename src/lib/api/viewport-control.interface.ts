import { Scrollbar } from './scrollbar.interface';
import { DomHelper } from '../helper/dom.helper';
import { Observable } from 'rxjs';

export interface IViewportControl {

    viewPort: Scrollbar.IScrollbarViewport;

    viewportDimension: DomHelper.IElementMeasure;

    /**
     * scroll page by specific amount
     *
     * @param {number} direction
     * @memberof ViewportControl
     */
    scrollPage(direction: number): void;

    /**
     * returns observable to get notified if viewport
     * has been changed in scroll or has been refreshed
     *
     * @returns {Observable<Scrollbar.Event>}
     * @memberof ViewportControl
     */
    onUpdate(): Observable<Scrollbar.Event>;

    /**
     * returns observable to get notified if viewport
     * has been changed in scroll or has been refreshed
     *
     * @returns {Observable<Scrollbar.Event>}
     * @memberof ViewportControl
     */
    onLoad(): Observable<DomHelper.IElementMeasure>;

    /**
     * viewport was changed, this could happen if new content
     * has been added or removed
     *
     * @memberof ViewportControl
     */
    update(): void;

    /**
     * viewport should scroll by specific amount
     *
     * @param {number} left
     * @param {number} top
     * @memberof ViewportControl
     */
    scrollTo(left: number, top: number);

    /**
     * scroll viewport to origin
     *
     * @memberof ScrollbarService
     */
    reset(): void;
}
