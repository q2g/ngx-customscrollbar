import { NgZone } from "@angular/core";
import { supportsScrollBehavior } from "@angular/cdk/platform";
import { fromEvent, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DomHelper } from "../helper/dom.helper";
import { Viewport } from "./viewport";
import { Scrollbar } from "../api/scrollbar.interface";

export class HtmlViewport extends Viewport {

    /**
     * stream to register on native scroll events
     */
    private scroll$: Observable<Event>;

    private destroy$: Subject<boolean>;

    private isDestroyed = false;

    public constructor(
        private zone: NgZone,
        private element: HTMLElement
    ) {
        super();
        this.destroy$ = new Subject();
    }

    /** element is bound to viewport */
    public init() {

        this.scroll$ = fromEvent(this.element, "scroll")
            .pipe(takeUntil(this.destroy$));

        this.registerEvents();
    }

    public destroy() {

        /**
         * component gets allready destroyed
         * could happens twice if we create this with directive which destroys the viewport
         * or we destroy the whole component which provides viewport control
         */
        if (this.isDestroyed) {
            return;
        }

        this.destroy$.next(true);
        this.destroy$.complete();
        this.isDestroyed = true;
    }

    /**
     * get container dimensions
     */
    public measureSize(): DomHelper.IScrollContainerMeasure {
        return DomHelper.getScrollContainerMeasure(this.element);
    }

    /**
     * scroll viewport to specific position
     */
    public scrollTo(offset: Scrollbar.IOffset) {
        if (supportsScrollBehavior()) {
            this.element.scrollTo(offset);
        } else {
            const { top, left } = offset;
            if (left || left === 0) {
                this.element.scrollLeft = left;
            }
            if (top || top === 0) {
                this.element.scrollTop = top;
            }
        }
    }

    /**
     * get scrolled offset
     */
    public get scrolledOffset() {
        return {
            top: this.element.scrollTop,
            left: this.element.scrollLeft
        };
    }

    /**
     * register to scroll event on html node
     */
    private registerEvents() {
        this.zone.runOutsideAngular(() => {
            this.scroll$.subscribe(() => {
                if (!this.viewPortController.disabled) {
                    this.scrolled$.next();
                    return;
                }
                this.scrollTo({ left: 0, top: 0 });
            });
        });
    }
}
