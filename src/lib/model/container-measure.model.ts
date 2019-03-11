
import { DomHelper } from '../helper/dom.helper';
import { importData } from '../helper';

/**
 * viewport model so save / share current state from viewport
 *
 * @export
 * @class ViewportModel
 * @implements {DomHelper.IElementMeasure}
 */
export class ContainerMeasureModel<T> implements DomHelper.IElementMeasure {

    /**
     * measure size of viewport
     *
     * @private
     * @type {DomHelper.IElementMeasure}
     * @memberof ViewportModel
     */
    private _measure: T;

    /**
     * inner height of viewport exclude borders and padding
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _innerHeight: number;

    /**
     * inner width of viewport exclude borders and padding
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _innerWidth: number;

    /**
     * height of viewport include borders and padding
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _height: number;

    /**
     * width of viewport include borders and padding
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _width: number;

    private _top: number;

    private _left: number;

    /**
     * Creates an instance of ViewportModel.
     * @param {DomHelper.IElementMeasure} data
     * @memberof ViewportModel
     */
    public constructor(data: T) {
        this.setMeasures(data);
    }

    /**
     * set measure data automatically imports data
     * to model
     *
     * @memberof ViewportModel
     */
    @importData
    public setMeasures(data: T) {
        this._measure = data;
    }

    /**
     * clone measure data and return it
     * so we cant modifiy this directly
     *
     * @readonly
     * @type {DomHelper.IElementMeasure}
     * @memberof ViewportModel
     */
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
