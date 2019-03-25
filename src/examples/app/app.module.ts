import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatTableModule} from "@angular/material";

import { AppComponent } from "./app.component";
import { VerticalScrollComponent } from "./vertical-scroll/vertical-scroll.component";
import { HorizontalScrollComponent } from "./horizontal-scroll/horizontal-scroll.component";
import { HorizontalVerticalScrollComponent } from "./horizontal-vertical-scroll/horizontal-vertical-scroll.component";
import { AsyncScrollComponent } from "./async/async-scroll.component";
import { NgxCustomScrollbarModule } from "ngx-customscrollbars";
import { TableComponent } from "./table/table.component";

@NgModule({
  declarations: [
    AppComponent,
    AsyncScrollComponent,
    HorizontalScrollComponent,
    HorizontalVerticalScrollComponent,
    VerticalScrollComponent,
    TableComponent,
  ],
  imports: [
    MatTableModule,
    NgxCustomScrollbarModule,
    BrowserModule,
    RouterModule.forRoot([
        {
            path: "",
            component: VerticalScrollComponent
        },
        {
            path: "horizontal",
            component: HorizontalScrollComponent
        },
        {
            path: "horizontal-vertical",
            component: HorizontalVerticalScrollComponent
        },
        {
            path: "async",
            component: AsyncScrollComponent
        },
        {
            path: "table",
            component: TableComponent
        }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
