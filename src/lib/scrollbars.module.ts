import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarsComponent } from './components/scrollbar.component';
import { ScrollbarHideOnNativeStyleDirective } from './directives/no-native-style.directive';
import { ScrollableContainerDirective } from './directives/scrollable-container.directive';
import { OverflowAutoYDirective } from './directives/overflow-auto-y.directive';
import { OverflowAutoXDirective } from './directives/overflow-auto-x.directive';

@NgModule({
    declarations: [
        ScrollableContainerDirective,
        ScrollbarsComponent,
        ScrollbarHideOnNativeStyleDirective,
        OverflowAutoYDirective,
        OverflowAutoXDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ScrollableContainerDirective,
        ScrollbarsComponent,
        ScrollbarHideOnNativeStyleDirective,
        OverflowAutoYDirective,
        OverflowAutoXDirective
    ],
    providers: []
})
export class ScrollbarsModule { }
