
import { Directive} from '@angular/core';
import { DomHelper } from '../helper/dom.helper';
import { NgxCustomScrollbarOverflowAuto } from './overflow-auto';

/**
 * renders component only if the viewport is overflows in x axis
 * otherwise remove / dont render it
 */
@Directive({ selector: '[ngxCustomScrollbarOverflowAutoX]' })
export class NgxCustomScrollbarOverflowAutoXDirective extends NgxCustomScrollbarOverflowAuto {

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollWidth > viewportDimension.width;
    }
}
