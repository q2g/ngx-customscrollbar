import { ScrollHelper } from './scroll.helper';
import { Scrollbar } from '../api/scrollbar.interface';

export class VerticalScrollHelper extends ScrollHelper {

    /**
     * calculate offset we have scrolled on viewport
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
     */
    public calculateScrollMax(): number {
        return this.viewportMeasure.scrollHeight - this.viewportMeasure.height;
    }

    /**
     * calculate max track position for scrollThumb
     */
    public calculateTrackMax(): number {
        return this.trackMeasure.innerHeight - this.calculateThumbSize();
    }

    /**
     * calculate thumbnail size
     */
    public calculateThumbSize(): number {
        const thumbSize = this.viewportMeasure.height * this.trackMeasure.innerHeight / this.viewportMeasure.scrollHeight;
        return thumbSize < 20 ? 20 : thumbSize;
    }

    /**
     * calculate scrollthumb position, set position for thumb
     */
    public calculateThumbPosition(): number {
        const top = this.viewportMeasure.scrollTop;
        const valueTop = top * this.calculateTrackMax() / this.calculateScrollMax();
        this.thumbMeasure.top = valueTop;
        return valueTop;
    }

    /**
     * returns thumb transform property
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

    public isScrollable(): boolean {
        return this.viewportMeasure.scrollHeight > this.viewportMeasure.height;
    }

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
