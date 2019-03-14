import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxCustomScrollbarComponent} from './components/scrollbar.component';
import {NgxCustomScrollbarHideOnNativeStyleDirective } from './directives/no-native-style.directive';
import {NgxCustomScrollbarScrollableDirective} from './directives/scrollable-container.directive';
import {NgxCustomScrollbarOverflowYDirective} from './directives/overflow-y.directive';
import {NgxCustomScrollbarOverflowXDirective} from './directives/overflow-x.directive';

@NgModule({
    declarations: [
        NgxCustomScrollbarComponent,
        NgxCustomScrollbarHideOnNativeStyleDirective,
        NgxCustomScrollbarOverflowXDirective,
        NgxCustomScrollbarOverflowYDirective,
        NgxCustomScrollbarScrollableDirective,
    ],
    exports: [
        NgxCustomScrollbarComponent,
        NgxCustomScrollbarHideOnNativeStyleDirective,
        NgxCustomScrollbarOverflowXDirective,
        NgxCustomScrollbarOverflowYDirective,
        NgxCustomScrollbarScrollableDirective,
    ],
    imports: [
        CommonModule,
    ]
})
export class NgxCustomScrollbarModule { }
