
import { Directive, Input} from '@angular/core';
import { DomHelper } from '../helper/dom.helper';
import { Overflow } from '../model/overflow';
import { NgxCustomScrollbarOverflow } from './overflow-auto';

/**
 * renders component only if the viewport is overflows in x axis
 * otherwise remove / dont render it
 */
@Directive({ selector: '[ngxCustomScrollbarOverflowX]' })
export class NgxCustomScrollbarOverflowXDirective extends NgxCustomScrollbarOverflow {

    @Input()
    public set ngxCustomScrollbarOverflowX(overflow: Overflow) {
        this.overflow = overflow;
    }

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollWidth > viewportDimension.width;
    }
}
