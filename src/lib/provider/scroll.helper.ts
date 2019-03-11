import { Scrollbar } from '../api/scrollbar.interface';
import { DomHelper } from '../helper/dom.helper';

export abstract class ScrollHelper {

    public constructor(
        protected thumbMeasure: DomHelper.IElementMeasure,
        protected trackMeasure: DomHelper.IElementMeasure,
        protected viewportMeasure: DomHelper.IScrollContainerMeasure
    ) {}

    /**
     * returns thumb transform property
     *
     * @returns {*}
     * @memberof VerticalScrollHelper
     */
    public abstract getScrollThumbCssTransform(): any;

    /**
     * return true if we could skip scroll event otherwise false
     *
     * @param {Scrollbar.DIRECTION} direction
     * @param {Scrollbar.ScrollEvent} event
     * @returns {boolean}
     * @memberof ScrollHelper
     */
    public couldSkipScrollEvent(direction: Scrollbar.DIRECTION, event: Scrollbar.ScrollEvent): boolean {
        if (direction === Scrollbar.DIRECTION.Y && event.scrolledY) {
            return false;
        }

        if (direction === Scrollbar.DIRECTION.X && event.scrolledX) {
            return false;
        }
        return true;
    }

    /**
     *
     *
     * @abstract
     * @param {MouseEvent} dragMove
     * @param {MouseEvent} dragStart
     * @param {ClientRect} offset
     * @memberof ScrollHelper
     */
    public abstract calculateDragDropScrollOffset(dragMove: MouseEvent, dragStart: Scrollbar.IOffset, offset: ClientRect);

    /**
     *
     *
     * @abstract
     * @memberof ScrollHelper
     */
    public abstract calculateScrollMax(): number;

    /**
     *
     *
     * @abstract
     * @returns {number}
     * @memberof ScrollHelper
     */
    public abstract calculateTrackMax(): number;

    /**
     *
     *
     * @abstract
     * @returns {number}
     * @memberof ScrollHelper
     */
    public abstract calculateThumbSize(): number;

    /**
     *
     *
     * @abstract
     * @returns {number}
     * @memberof ScrollHelper
     */
    public abstract calculateThumbPosition(): number;

    /**
     * get css property for scrollbar thumb
     *
     * @abstract
     * @returns {*}
     * @memberof ScrollHelper
     */
    public abstract getScrollThumbCssSize(): any;

    /**
     * returns true if content is scrollable otherwise false
     *
     * @abstract
     * @returns {boolean}
     * @memberof ScrollHelper
     */
    public abstract isScrollable(): boolean;

    public abstract calculatePageScroll(offset: Scrollbar.IOffset);
}
