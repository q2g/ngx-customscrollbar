import { Directive, Input} from '@angular/core';
import { NgxCustomScrollbarOverflow } from './overflow-auto';
import { DomHelper } from '../helper/dom.helper';
import { Overflow } from '../model/overflow';

/**
 * remove component if no overflow on y axis
 */
@Directive({selector: '[ngxCustomScrollbarOverflowY]'})
export class NgxCustomScrollbarOverflowYDirective extends NgxCustomScrollbarOverflow {

    @Input()
    public set ngxCustomScrollbarOverflowY(overflow: 'none' | 'auto' | 'scroll') {
        if (overflow === Overflow.NONE) {
            this.viewportController.disableScroll(true);
        }

        this.overflow = overflow;
    }

    protected hasOverflow(viewportDimension: DomHelper.IScrollContainerMeasure): boolean {
        return viewportDimension.scrollHeight > viewportDimension.height;
    }
}
