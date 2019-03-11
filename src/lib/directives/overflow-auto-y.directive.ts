import { Directive} from '@angular/core';
import { OverflowAuto } from './overflow-auto';
import { DomHelper } from '../helper/dom.helper';

/**
 * remove component if no overflow on y axis
 *
 * @export
 * @class ScrollOverflowAutoDirective
 * @implements {DoCheck}
 * @implements {OnInit}
 */
@Directive({selector: '[q2gOverflowAutoY]'})
export class OverflowAutoYDirective extends OverflowAuto {

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollHeight > viewportDimension.height;
    }
}
