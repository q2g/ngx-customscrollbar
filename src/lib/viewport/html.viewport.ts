import { NgZone, Inject } from '@angular/core';
import { supportsScrollBehavior } from '@angular/cdk/platform';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { DomHelper } from '../helper/dom.helper';
import { takeUntil } from 'rxjs/operators';
import { Viewport } from './viewport';
import { Scrollbar } from '../api/scrollbar.interface';

export class HtmlViewport extends Viewport {

    private _element: HTMLElement;

    private scroll$: Observable<Event>;

    private destroyed$: Subject<boolean>;

    public constructor(
        @Inject(NgZone) private zone
    ) {
        super();
        this.destroyed$ = new Subject();
    }

    /**
     * set new element
     *
     * @memberof HtmlViewportAdapter
     */
    public set element(el: HTMLElement) {

        /** same element we need to do nothing */
        if (this._element && this._element === el) {
            return;
        }

        if (this._element) {
            this.destroyed$.next(true);
        }

        /** create new scroll stream and run until the root element gets destroyed/replaced */
        this.scroll$ = fromEvent(el, 'scroll')
            .pipe(takeUntil(this.destroyed$));

        this._element = el;

        /** if element has allready been registered on control, bring good news and update them */
        if (this.control) {
            this.control.update();
        }

        this.registerEvents();
    }

    /**
     * @inheritdoc
     * @returns {Scrollbar.IViewportMeasure}
     * @memberof HtmlViewportAdapter
     */
    public measureSize(): DomHelper.IScrollContainerMeasure {
        return DomHelper.getScrollContainerMeasure(this._element);
    }

    /**
     * @inheritdoc
     * @protected
     * @param {number} left
     * @param {number} top
     * @memberof HtmlViewportAdapter
     */
    public scrollTo(offset: Scrollbar.IOffset) {
        if (supportsScrollBehavior()) {
            this._element.scrollTo(offset);
        } else {
            const {top, left} = offset;
            if (left || left === 0) {
                this._element.scrollLeft = left;
            }
            if (top || top === 0) {
                this._element.scrollTop = top;
            }
        }
    }

    /**
     *
     *
     * @readonly
     * @memberof HtmlViewportAdapter
     */
    public get scrolledOffset() {
        return {
            top: this._element.scrollTop,
            left: this._element.scrollLeft
        };
    }

    /**
     * @inheritdoc
     * @private
     * @memberof HtmlViewportAdapter
     */
    private registerEvents() {
        this.zone.runOutsideAngular(() => {
            this.scroll$.subscribe(() => {
                // update offset here
                this.scrolled$.next();
            });
        });
    }
}
