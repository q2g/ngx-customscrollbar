import { Observable } from "rxjs";
import { DomHelper } from "../helper/dom.helper";
import { IViewportControl } from "./viewport-control.interface";

export namespace Scrollbar {

    export interface IScrollbarViewport {

        control: IViewportControl;

        readonly scrolledOffset: {
            left: number;
            top: number;
        };

        /** scrollbar has been bound to viewport control */
        init();

        /** destroy viewport */
        destroy();

        measureSize(): DomHelper.IScrollContainerMeasure;

        reset(): void;

        scrollTo(offset: IOffset): void;

        onScrolled(): Observable<void>;
    }

    export interface Event {
        type: VIEWPORT_EVENT;
    }

    export interface ScrollEvent extends Event {
        scrolledX: boolean;
        scrolledY: boolean;
    }

    export const enum VIEWPORT_EVENT {
        INITIALIZED = "viewport_initialized",
        SCROLLED    = "viewport_scrolled",
        UPDATE      = "viewport_update"
    }

    export const enum DIRECTION {
        X = "horizontal",
        Y = "vertical",
    }

    export const enum PAGE_SCROLL {
        BACK = -1,
        FORWARD = 1,
    }

    export interface IOffset {
        top: number;
        left: number;
    }
}
