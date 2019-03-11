
import { Directive} from '@angular/core';
import { DomHelper } from '../helper/dom.helper';
import { OverflowAuto } from './overflow-auto';

/**
 * renders component only if the viewport is overflows in x axis
 * otherwise remove / dont render it
 *
 * @export
 * @class ScrollOverflowAutoDirective
 * @implements {DoCheck}
 * @implements {OnInit}
 */
@Directive({ selector: '[q2gOverflowAutoX]' })
export class OverflowAutoXDirective extends OverflowAuto {

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollWidth > viewportDimension.width;
    }
}
