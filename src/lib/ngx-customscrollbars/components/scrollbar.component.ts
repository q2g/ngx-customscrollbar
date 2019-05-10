import {
    AfterViewInit,
    Component,
    ElementRef,
    Host,
    Inject,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewChild,
    OnInit,
    Input,
    HostBinding,
    Optional
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent, Subject, Observable } from "rxjs";
import { tap, takeUntil, switchMap, finalize } from "rxjs/operators";
import { Scrollbar } from "../api/scrollbar.interface";
import { DomHelper } from "../helper/dom.helper";
import { ContainerMeasureModel } from "../model/container-measure.model";
import { ScrollHelper } from "../provider/scroll.helper";
import { ViewportControl } from "../provider/viewport.control";
import { HorizontalScrollHelper } from "../provider/horiziontal-scroll.helper";
import { VerticalScrollHelper } from "../provider/vertical-scroll.helper";

@Component({
    selector: "ngx-customscrollbar",
    templateUrl: "scrollbar.component.html",
    styleUrls: ["./scrollbar.component.scss"]
})
export class NgxCustomScrollbarComponent implements AfterViewInit, OnDestroy, OnInit {

    @Input()
    @HostBinding("class")
    @HostBinding("class.ngx-customscrollbars")
    public scrollDirection = Scrollbar.DIRECTION.Y;

    @ViewChild("scrollbarTrack")
    private scrollbarTrack: ElementRef;

    @ViewChild("scrollbarThumb")
    private scrollbarThumb: ElementRef;

    private scrollHelper: ScrollHelper;
    private isDestroyed$: Subject<boolean>;
    private thumbMeasure: ContainerMeasureModel<DomHelper.IElementMeasure>;
    private trackMeasure: ContainerMeasureModel<DomHelper.IElementMeasure>;
    private viewportMeasure: DomHelper.IScrollContainerMeasure;

    constructor(
        @Host() @Optional() private viewportController: ViewportControl,
        @Inject(DOCUMENT) private document,
        private hostEl: ElementRef,
        private ngZone: NgZone,
        private renderer: Renderer2,
    ) {
        this.isDestroyed$ = new Subject();
    }

    /**
     * initialize scrollbar track and scrollbar thumb events
     */
    ngOnInit() {

        this.ngZone.runOutsideAngular(() => {
            this.registerThumbEvents()
                .pipe(takeUntil(this.isDestroyed$))
                .subscribe();

            this.registerScrollTrackEvents();
        });
    }

    /**
     * dom is rendered and initialized
     */
    ngAfterViewInit() {

        this.viewportController.addScrollbar(this);

        /** viewport has been attached */
        this.viewportController.onLoad()
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((measure) => this.handleViewportLoaded(measure));

        /** viewport has been updated in size or is scrolled */
        this.viewportController.onScroll()
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((event) => this.handleViewportScroll(event));
    }

    /**
     * compoenent gets destroyed remove
     * emit true to isDestroyed to remove subscriptions
     * from all streams
     */
    ngOnDestroy() {

        this.viewportController.removeScrollbar(this);

        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();

        this.scrollHelper = null;
        this.thumbMeasure = null;
        this.trackMeasure = null;
        this.viewportMeasure = null;
    }

    public render() {
        const thumb = this.scrollbarThumb.nativeElement;
        const track = this.scrollbarTrack.nativeElement;

        this.renderer.setStyle(thumb, "display", "none");
        this.trackMeasure.setMeasures(DomHelper.getMeasure(track));
        this.thumbMeasure.setMeasures(DomHelper.getMeasure(thumb));

        this.renderScrollbarThumb();
        this.moveThumbToPosition();
    }

    /**
     * a viewport has been added to viewport controller
     */
    private handleViewportLoaded(measure: DomHelper.IScrollContainerMeasure) {
        const thumb = this.scrollbarThumb.nativeElement;
        const track = this.scrollbarTrack.nativeElement;
        this.thumbMeasure = new ContainerMeasureModel(DomHelper.getMeasure(thumb));
        this.trackMeasure = new ContainerMeasureModel(DomHelper.getMeasure(track));
        this.viewportMeasure = measure;

        this.initializeScrollHelper();
        this.renderScrollbarThumb();
        this.moveThumbToPosition();
    }

    /**
     * viewportControl sends update, this could be
     * initialized, scrolled or content changes
     */
    private handleViewportScroll(event: Scrollbar.ScrollEvent) {

        if (this.scrollHelper.couldSkipScrollEvent(this.scrollDirection, event)) {
            return;
        }

        this.renderScrollbarThumb();
        this.moveThumbToPosition();
    }

    /**
     * initialize scroll helpers
     */
    private initializeScrollHelper() {

        if (!this.scrollHelper) {
            const scrollHelperConstructor = this.scrollDirection === Scrollbar.DIRECTION.X
                ? HorizontalScrollHelper
                : VerticalScrollHelper;

            this.scrollHelper = new scrollHelperConstructor(this.thumbMeasure, this.trackMeasure, this.viewportMeasure);
        } else {
            this.scrollHelper.viewportMeasure = this.viewportMeasure;
        }
    }

    /**
     * renders scrollbar thumb
     */
    private renderScrollbarThumb() {
        const thumb = this.scrollbarThumb.nativeElement;

        if (!this.scrollHelper.isScrollable()) {
            this.renderer.setStyle(thumb, "display", "none");
        } else {
            const cssSize = this.scrollHelper.getScrollThumbCssSize();
            this.renderer.removeStyle(thumb, "display");
            this.renderer.setStyle(thumb, cssSize.style, cssSize.value);
        }
    }

    /**
     * move thumb to position after viewport has been scrolled
     */
    private moveThumbToPosition() {
        const thumb = this.scrollbarThumb.nativeElement;
        const scrollCSS = this.scrollHelper.getScrollThumbCssTransform();
        this.renderer.setStyle(thumb, scrollCSS.style, scrollCSS.value);
    }

    /**
     * register scrollbar track click event to scroll a page
     */
    private registerScrollTrackEvents() {
        const track = this.scrollbarTrack.nativeElement;
        fromEvent(track, "click")
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((event: MouseEvent) => {
                if (event.target === this.scrollbarThumb.nativeElement) {
                    return false;
                }
                const offset = this.scrollHelper.calculatePageScroll(DomHelper.getMouseOffset(event));
                this.viewportController.scrollTo(offset);
            });
    }

    /**
     * handle drag drop on scrollbar thumb
     */
    private registerThumbEvents(): Observable<MouseEvent> {
        const mouseDown$ = fromEvent(this.scrollbarThumb.nativeElement, "mousedown");
        const mouseMove$ = fromEvent(this.document, "mousemove");
        const mouseUp$ = fromEvent(window, "mouseup");

        const dragDrop$ = mouseDown$.pipe(
            tap(() => this.document.onselectstart = () => false),
            switchMap((dragStart: MouseEvent) => {
                const offset = DomHelper.getElementBounds(this.scrollbarTrack.nativeElement);
                const dragOffset = DomHelper.getMouseOffset(dragStart);

                this.renderer.addClass(this.hostEl.nativeElement, "dragged");

                /** switch to mousemove stream until we press mouse button */
                return mouseMove$.pipe(
                    tap((dragMove: MouseEvent) => {
                        this.viewportController.scrollTo(
                            this.scrollHelper.calculateDragDropScrollOffset(dragMove, dragOffset, offset)
                        );
                    }),
                    finalize(() => {
                        this.document.onselectstart = null;
                        this.renderer.removeClass(this.hostEl.nativeElement, "dragged");
                    }),
                    takeUntil(mouseUp$),
                );
            })
        );
        return dragDrop$.pipe(takeUntil(this.isDestroyed$));
    }
}
