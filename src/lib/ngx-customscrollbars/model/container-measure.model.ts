
import { DomHelper } from "../helper/dom.helper";
import { importData } from "../helper/import-data.decorator";

/**
 * viewport model so save / share current state from viewport
 */
export class ContainerMeasureModel<T> implements DomHelper.IElementMeasure {

    private _measure: T;

    private _innerHeight: number;

    private _innerWidth: number;

    private _height: number;

    private _width: number;

    private _top: number;

    private _left: number;

    public constructor(data: T) {
        this.setMeasures(data);
    }

    @importData
    public setMeasures(data: T) {
        this._measure = data;
    }

    public get measures(): T {
        return {...this._measure};
    }

    public set innerHeight(value: number) {
        this._innerHeight = value;
    }

    public set innerWidth(value: number) {
        this._innerWidth = value;
    }

    public set height(value: number) {
        this._height = value;
    }

    public set width(value: number) {
        this._width = value;
    }

    public set top(value: number) {
        this._top = value;
    }

    public set left(value: number) {
        this._left = value;
    }

    public get innerHeight(): number {
        return this._innerHeight;
    }

    /**
     * @returns number
     */
    public get innerWidth(): number {
        return this._innerWidth;
    }

    public get height(): number {
        return this._height;
    }

    public get width(): number {
        return this._width;
    }

    public get top(): number {
        return this._top;
    }

    public get left(): number {
        return this._left;
    }
}
