export interface IScrollHelper {

    /**
     * calculate scroll offset
     *
     * @param {MouseEvent} dragMove
     * @param {MouseEvent} dragStart
     * @returns {*}
     * @memberof IScrollHelper
     */
    calculateScrollOffset(dragMove: MouseEvent, dragStart: MouseEvent): any;

    /**
     * calculate track offset
     *
     * @param {*} dimension
     * @memberof IScrollHelper
     */
    calculateTrackOffset(dimension);

    /**
     * calculate offset of scroll thumb
     *
     * @private
     * @param {*} dimension
     * @memberof ScrollbarsComponent
     */
    calculateThumbOffset(dimension);

    /**
     * calculates current thumb position
     *
     * @memberof IScrollHelper
     */
    calculateThumbPosition();
}
