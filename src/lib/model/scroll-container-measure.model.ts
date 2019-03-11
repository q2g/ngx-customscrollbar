import { ContainerMeasureModel } from './container-measure.model';
import { DomHelper } from '../helper/dom.helper';
import { importData } from '../helper';

/**
 * scroll container measure model
 * include scroll dimensions
 *
 * @export
 * @class ViewportModel
 * @implements {DomHelper.IElementMeasure}
 */
export class ScrollContainerMeasureModel extends ContainerMeasureModel<DomHelper.IScrollContainerMeasure> {

    /**
     * available scroll height for viewport
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _scrollHeight: number;

    /**
     * scroll offset left
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _scrollLeft: number;

    /**
     * scroll offset top
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _scrollTop: number;

    /**
     * available scroll width for viewport
     *
     * @private
     * @type {number}
     * @memberof ViewportModel
     */
    private _scrollWidth: number;

    /**
     * set measure data automatically imports data
     * to model
     *
     * @memberof ViewportModel
     */
    @importData
    public setMeasures(data: DomHelper.IScrollContainerMeasure) {
        super.setMeasures(data);
    }

    public set scrollHeight(value: number) {
        this._scrollHeight = value;
    }

    public set scrollLeft(value: number) {
        this._scrollLeft = value;
    }

    public set scrollTop(value: number) {
        this._scrollTop = value;
    }

    public set scrollWidth(value: number) {
        this._scrollWidth = value;
    }

    public get scrollHeight(): number {
        return this._scrollHeight;
    }

    public get scrollLeft(): number {
        return this._scrollLeft;
    }

    public get scrollTop(): number {
        return this._scrollTop;
    }

    public get scrollWidth(): number {
        return this._scrollWidth;
    }
}
