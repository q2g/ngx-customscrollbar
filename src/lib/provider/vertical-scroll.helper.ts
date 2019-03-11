import { ScrollHelper } from './scroll.helper';
import { Scrollbar } from '../api/scrollbar.interface';

/**
 * scroll helper for vertical scrollbars
 *
 * @export
 * @class VerticalScrollHelper
 * @extends {ScrollHelper}
 */
export class VerticalScrollHelper extends ScrollHelper {

    /**
     * calculate offset we have scrolled on viewport
     *
     * @param {MouseEvent} dragMove
     * @param {MouseEvent} dragStart
     * @param {ClientRect} offset
     * @returns {Scrollbar.IOffset}
     * @memberof VerticalScrollHelper
     */
    public calculateDragDropScrollOffset(dragMove: MouseEvent, dragStartOffset: Scrollbar.IOffset, offset: ClientRect): Scrollbar.IOffset {

        const offsetTop = dragMove.clientY - offset.top;
        /** @TODO dont calculate this every time, this will not change on drag drop */
        const trackMax = this.calculateTrackMax();
        /** @TODO dont calculate this every time, this will not change on drag drop */
        const scrollMax = this.calculateScrollMax();

        const top = scrollMax * (offsetTop - dragStartOffset.top) / trackMax;
        const left = this.viewportMeasure.scrollLeft;

        return { top, left };
    }

    /**
     * calculate max scroll position on viewport
     *
     * @returns
     * @memberof VerticalScrollHelper
     */
    public calculateScrollMax(): number {
        return this.viewportMeasure.scrollHeight - this.viewportMeasure.height;
    }

    /**
     * calculate max track position for scrollThumb
     *
     * @returns {number}
     * @memberof VerticalScrollHelper
     */
    public calculateTrackMax(): number {
        return this.trackMeasure.innerHeight - this.calculateThumbSize();
    }

    /**
     * calculate thumbnail size
     *
     * @returns {number}
     * @memberof VerticalScrollHelper
     */
    public calculateThumbSize(): number {
        const thumbSize = this.viewportMeasure.height * this.trackMeasure.innerHeight / this.viewportMeasure.scrollHeight;
        return thumbSize < 20 ? 20 : thumbSize;
    }

    /**
     * calculate scrollthumb position, set position for thumb
     *
     * @returns {number}
     * @memberof VerticalScrollHelper
     */
    public calculateThumbPosition(): number {
        const top = this.viewportMeasure.scrollTop;
        /**
         * @todo should not calculate track and scroll max every time
         * this is not required
         */
        const valueTop = top * this.calculateTrackMax() / this.calculateScrollMax();
        this.thumbMeasure.top = valueTop;
        return valueTop;
    }

    /**
     * returns thumb transform property
     *
     * @returns {*}
     * @memberof VerticalScrollHelper
     */
    public getScrollThumbCssTransform(): any {
        const top = this.calculateThumbPosition();
        return {
            style: 'transform',
            value: `translate3d(0, ${top}px, 0)`
        };
    }

    public getScrollThumbCssSize(): any {
        const height = this.calculateThumbSize();
        return { style: 'height', value: `${height}px` };
    }

    /**
     * @inheritdoc
     * @returns {boolean}
     * @memberof VerticalScrollHelper
     */
    public isScrollable(): boolean {
        return this.viewportMeasure.scrollHeight > this.viewportMeasure.height;
    }

    /**
     * @inheritdoc
     * @param {MouseEvent} event
     * @memberof VerticalScrollHelper
     */
    public calculatePageScroll(offset: Scrollbar.IOffset): Scrollbar.IOffset {

        const modifier = offset.top < this.thumbMeasure.top
            ? Scrollbar.PAGE_SCROLL.BACK
            : Scrollbar.PAGE_SCROLL.FORWARD;

        const scrollOffset = {
            top: this.viewportMeasure.scrollTop + (this.viewportMeasure.height * modifier),
            left: this.viewportMeasure.scrollLeft
        };

        return scrollOffset;
    }
}
