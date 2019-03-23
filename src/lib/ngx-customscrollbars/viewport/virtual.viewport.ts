
import { Viewport } from './viewport';
import { DomHelper } from '../helper/dom.helper';
import { Scrollbar } from '../api/scrollbar.interface';

export class VirtualViewport extends Viewport {

    scrolledOffset: any;

    private measureOffset: DomHelper.IScrollContainerMeasure;

    init() {
    }

    public constructor() {
        super();

        this.measureOffset = {
            innerHeight: 0,
            innerWidth: 0,
            scrollLeft: 0,
            scrollTop: 0,
            scrollWidth: 2000,
            scrollHeight: 4000,
            height: 600,
            width: 0,
            top: 0,
            left: 0
        };
    }

    public measureSize(): DomHelper.IScrollContainerMeasure {
        return this.measureOffset;
    }

    public scrollTo(offset: Scrollbar.IOffset) {
        this.measureOffset.scrollTop  = offset.top;
        this.measureOffset.scrollLeft = offset.left;
        this.scrolled$.next();
    }
}
