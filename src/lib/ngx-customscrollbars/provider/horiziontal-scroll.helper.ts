import { ScrollHelper } from "./scroll.helper";
import { Scrollbar } from "../api/scrollbar.interface";

/**
 * helper for calculations on vertical scrollbars
 */
export class HorizontalScrollHelper extends ScrollHelper {

    public calculateScrollMax(): number {
        return this.viewportMeasure.scrollWidth - this.viewportMeasure.width;
    }

    public calculateThumbPosition(): number {
        const left = this.viewportMeasure.scrollLeft;
        const offsetLeft = left * this.calculateTrackMax() / this.calculateScrollMax();
        this.thumbMeasure.left = offsetLeft;
        return offsetLeft;
    }

    public calculateDragDropScrollOffset(dragMove: MouseEvent, dragDroffset: Scrollbar.IOffset, offset: ClientRect) {
        const offsetLeft = dragMove.clientX - offset.left;
        const trackMax = this.calculateTrackMax();
        const scrollMax = this.calculateScrollMax();

        const top = this.viewportMeasure.scrollTop;
        const left = scrollMax * (offsetLeft - dragDroffset.left) / trackMax;

        return {top, left};
    }

    public calculateTrackMax(): number {
        return this.trackMeasure.innerWidth - this.calculateThumbSize();
    }

    public calculateThumbSize(): number {
        const thumbSize = this.viewportMeasure.width * this.trackMeasure.innerWidth / this.viewportMeasure.scrollWidth;
        return thumbSize < 20 ? 20 : thumbSize;
    }

    /**
     * returns thumb transform property
     */
    public getScrollThumbCssTransform(): any {
        const left = this.calculateThumbPosition();

        return {
            style: "transform",
            value: `translate3d(${left}px, 0, 0)`
        };
    }

    public getScrollThumbCssSize() {
        const width = this.calculateThumbSize();
        return { style: "width", value: `${width}px` };
    }

    public isScrollable(): boolean {
        return this.viewportMeasure.scrollWidth > this.viewportMeasure.width;
    }

    public calculatePageScroll(offset: Scrollbar.IOffset): Scrollbar.IOffset {

        const modifier = offset.left < this.thumbMeasure.left
            ? Scrollbar.PAGE_SCROLL.BACK
            : Scrollbar.PAGE_SCROLL.FORWARD;

        const scrollOffset = {
            left: this.viewportMeasure.scrollLeft + (this.viewportMeasure.width * modifier),
            top: this.viewportMeasure.scrollTop
        };

        return scrollOffset;
    }
}
