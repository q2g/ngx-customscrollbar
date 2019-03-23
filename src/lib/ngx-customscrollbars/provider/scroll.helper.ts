import { Scrollbar } from '../api/scrollbar.interface';
import { DomHelper } from '../helper/dom.helper';

export abstract class ScrollHelper {

    public constructor(
        protected thumbMeasure: DomHelper.IElementMeasure,
        protected trackMeasure: DomHelper.IElementMeasure,
        protected _viewportMeasure: DomHelper.IScrollContainerMeasure
    ) { }

    public set viewportMeasure(measure: DomHelper.IScrollContainerMeasure) {
        this._viewportMeasure = measure;
    }

    public get viewportMeasure(): DomHelper.IScrollContainerMeasure {
        return this._viewportMeasure;
    }

    /**
     * returns thumb transform property
     */
    public abstract getScrollThumbCssTransform(): any;

    public abstract calculateDragDropScrollOffset(
        dragMove: MouseEvent,
        dragStart: Scrollbar.IOffset,
        offset: ClientRect
    ): Scrollbar.IOffset;

    public abstract calculateScrollMax(): number;

    public abstract calculateTrackMax(): number;

    public abstract calculateThumbSize(): number;

    public abstract calculateThumbPosition(): number;

    public abstract getScrollThumbCssSize(): any;

    public abstract isScrollable(): boolean;

    /**
     * return calculated page scroll offset for specific axis
     */
    public abstract calculatePageScroll(offset: Scrollbar.IOffset): Scrollbar.IOffset;

    /**
     * return true if we could skip scroll event otherwise false
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
}
