import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VerticalScrollComponent } from './vertical-scroll/vertical-scroll.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';
import { HorizontalVerticalScrollComponent } from './horizontal-vertical-scroll/horizontal-vertical-scroll.component';
import { AsyncScrollComponent } from './async/async-scroll.component';
import { NgxCustomScrollbarModule } from 'projects/scrollbars/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
    AsyncScrollComponent,
    HorizontalScrollComponent,
    HorizontalVerticalScrollComponent,
    VerticalScrollComponent,
  ],
  imports: [
    NgxCustomScrollbarModule,
    BrowserModule,
    RouterModule.forRoot([
        {
            path: '',
            component: VerticalScrollComponent
        },
        {
            path: 'horizontal',
            component: HorizontalScrollComponent
        },
        {
            path: 'horizontal-vertical',
            component: HorizontalVerticalScrollComponent
        },
        {
            path: 'async',
            component: AsyncScrollComponent
        }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
