import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxCustomScrollbarComponent} from './components/scrollbar.component';
import {NgxCustomScrollbarHideOnNativeStyleDirective } from './directives/no-native-style.directive';
import {NgxCustomScrollbarScrollableDirective} from './directives/scrollable-container.directive';
import {NgxCustomScrollbarOverflowAutoYDirective} from './directives/overflow-auto-y.directive';
import {NgxCustomScrollbarOverflowAutoXDirective} from './directives/overflow-auto-x.directive';

@NgModule({
    declarations: [
        NgxCustomScrollbarComponent,
        NgxCustomScrollbarHideOnNativeStyleDirective,
        NgxCustomScrollbarOverflowAutoXDirective,
        NgxCustomScrollbarOverflowAutoYDirective,
        NgxCustomScrollbarScrollableDirective,
    ],
    exports: [
        NgxCustomScrollbarComponent,
        NgxCustomScrollbarHideOnNativeStyleDirective,
        NgxCustomScrollbarOverflowAutoXDirective,
        NgxCustomScrollbarOverflowAutoYDirective,
        NgxCustomScrollbarScrollableDirective,
    ],
    imports: [
        CommonModule,
    ]
})
export class NgxCustomScrollbarModule { }
