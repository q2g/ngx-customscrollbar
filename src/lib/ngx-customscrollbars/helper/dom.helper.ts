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
        return {
            height: el.offsetHeight,
            width: el.offsetWidth,
            innerHeight: getElementHeight(el),
            innerWidth: getElementWidth(el),
            top: parseInt(getElementStyle(el, 'top'), 10),
            left: parseInt(getElementStyle(el, 'left'), 10)
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
     * get element inner height, without border, margin and padding
     */
    export function getElementHeight(el: HTMLElement): number {
        return parseInt(getElementStyle(el, 'height'), 10);
    }

    /**
     * get elment inner width without border, margin and padding
     */
    export function getElementWidth(el: HTMLElement): number {
        return parseInt(getElementStyle(el, 'width'), 10);
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
