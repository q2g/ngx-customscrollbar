import { Scrollbar } from "../api/scrollbar.interface";
import { Subject } from "rxjs";
import { DomHelper } from "../helper/dom.helper";
import { IViewportControl } from "../api/viewport-control.interface";

export abstract class Viewport implements Scrollbar.IScrollbarViewport {

    protected viewportScrolledOffset = { top: 0, left: 0 };

    protected scrolled$: Subject<void> = new Subject();

    protected viewPortController: IViewportControl;

    abstract measureSize(): DomHelper.IScrollContainerMeasure;

    abstract get scrolledOffset();

    abstract scrollTo(offset: Scrollbar.IOffset);

    public destroy() { /* noop */ }

    public init() { /** noop */ }

    public set control(control: IViewportControl) {
        this.viewPortController = control;
    }

    public get control(): IViewportControl {
        return this.viewPortController;
    }

    public reset() {
        this.scrollTo({top: 0, left: 0});
    }

    public onScrolled() {
        return this.scrolled$.asObservable();
    }
}
