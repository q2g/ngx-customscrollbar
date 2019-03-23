import { Scrollbar } from '../api/scrollbar.interface';

export namespace DomHelper {

    export interface IElementMeasure {
        innerHeight: number;
        innerWidth: number;
        height: number;
        width: number;
        top: number;
        left: number;
    }

    export interface IScrollContainerMeasure extends IElementMeasure {
        scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        scrollWidth: number;
    }

    /**
     * get computed style from element
     */
    export function getElementStyle(el: HTMLElement, style: string): string | null {
        let styleValue: string;
        try {
            styleValue = getComputedStyle(el, null).getPropertyValue(style);
        } catch (e) {
            styleValue = null;
        }
        return styleValue;
    }

    export function getMeasure(el: HTMLElement): DomHelper.IElementMeasure {
        // get computed style not works that good and that fast like el.offsetHeight
        return {
            height: el.offsetHeight,
            width: el.offsetWidth,
            innerHeight: getInnerHeight(el),
            innerWidth: getInnerWidth(el),
            top: el.offsetTop,
            left: el.offsetLeft
        };
    }

    export function getScrollContainerMeasure(el: HTMLElement): DomHelper.IScrollContainerMeasure {
        const elMeasure = getMeasure(el);
        return {
            ...elMeasure,
            scrollHeight: el.scrollHeight,
            scrollLeft: el.scrollLeft,
            scrollTop: el.scrollTop,
            scrollWidth: el.scrollWidth,
        };
    }

    /**
     * get element inner height, without padding
     */
    export function getInnerHeight(el: HTMLElement): number {
        /** @todo this will called alot times on resize */
        const computed = getComputedStyle(el, null);
        const paddingTop = parseInt(computed.getPropertyValue('padding-top'), 10);
        const paddingBot = parseInt(computed.getPropertyValue('padding-bottom'), 10);
        return el.offsetHeight - paddingTop - paddingBot;
    }

    /**
     * get elment inner width without border, margin and padding
     */
    export function getInnerWidth(el: HTMLElement): number {
        /** @todo this will called alot times on resize */
        const computed = getComputedStyle(el, null);
        const paddingLeft = parseInt(computed.getPropertyValue('padding-left'), 10);
        const paddingRight = parseInt(computed.getPropertyValue('padding-right'), 10);
        return el.offsetWidth - paddingLeft - paddingRight;
    }

    /**
     * get element bounds
     */
    export function getElementBounds(el: HTMLElement): ClientRect {
        return el.getBoundingClientRect();
    }

    /**
     * calclulate offsetX / offsetY for MouseEvents
     * we could use event.offsetX or event.offsetY but this is experimental
     * and not working correctly in FF for some times.
     */
    export function getMouseOffset(event: MouseEvent): Scrollbar.IOffset {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        return {
            left: event.clientX - rect.left,
            top: event.clientY - rect.top
        };
    }
}
