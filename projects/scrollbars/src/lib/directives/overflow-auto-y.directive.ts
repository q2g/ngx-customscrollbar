import { Directive} from '@angular/core';
import { NgxCustomScrollbarOverflowAuto } from './overflow-auto';
import { DomHelper } from '../helper/dom.helper';

/**
 * remove component if no overflow on y axis
 */
@Directive({selector: '[ngxCustomScrollbarOverflowAutoY]'})
export class NgxCustomScrollbarOverflowAutoYDirective extends NgxCustomScrollbarOverflowAuto {

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollHeight > viewportDimension.height;
    }
}
