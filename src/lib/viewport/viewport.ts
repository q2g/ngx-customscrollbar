import { Scrollbar } from '../api/scrollbar.interface';
import { Subject } from 'rxjs';
import { DomHelper } from '../helper/dom.helper';
import { IViewportControl } from '../api/viewport-control.interface';

export abstract class Viewport implements Scrollbar.IScrollbarViewport {

    protected viewportScrolledOffset = { top: 0, left: 0 };

    protected scrolled$: Subject<void> = new Subject();

    private viewPortController: IViewportControl;

    /**
     * @inheritdoc
     *
     * @abstract
     * @returns {DomHelper.IElementMeasure}
     * @memberof ViewportAdapter
     */
    abstract measureSize(): DomHelper.IScrollContainerMeasure;

    abstract get scrolledOffset();

    /**
     * @inheritdoc
     *
     * @abstract
     * @param {number} left
     * @param {number} top
     * @memberof ViewportAdapter
     */
    abstract scrollTo(offset: Scrollbar.IOffset);

    /**
     * destroy viewport, should overriden
     *
     * @memberof ViewportAdapter
     */
    public destroy() { /* noop */ }

    /**
     * sets viewport control after adapter has been registered
     * on viewport controller
     *
     * @memberof ViewportAdapter
     */
    public set control(control: IViewportControl) {
        this.viewPortController = control;
    }

    /**
     * get viewport controller for adapter
     *
     * @memberof ViewportAdapter
     */
    public get control(): IViewportControl {
        return this.viewPortController;
    }

    /**
     * scroll to top
     *
     * @memberof ViewportAdapter
     */
    public reset() {
        this.scrollTo({top: 0, left: 0});
    }

    /**
     * get events for component has been scrolled
     *
     * @returns
     * @memberof ViewportAdapter
     */
    public onScrolled() {
        return this.scrolled$.asObservable();
    }
}
