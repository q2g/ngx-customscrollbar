import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";

import { AppComponent } from "./app.component";
import { VerticalScrollComponent } from "./vertical-scroll/vertical-scroll.component";
import { HorizontalScrollComponent } from "./horizontal-scroll/horizontal-scroll.component";
import { HorizontalVerticalScrollComponent } from "./horizontal-vertical-scroll/horizontal-vertical-scroll.component";
import { AsyncScrollComponent } from "./async/async-scroll.component";
import { NgxCustomScrollbarModule } from "lib/public_api";
import { TableComponent } from "./table/table.component";
import { CdkVirtualScrollOverviewExampleComponent } from "./virtual-scroll/virtual-scroll.component";

@NgModule({
    declarations: [
        AppComponent,
        AsyncScrollComponent,
        HorizontalScrollComponent,
        HorizontalVerticalScrollComponent,
        VerticalScrollComponent,
        CdkVirtualScrollOverviewExampleComponent,
        TableComponent
    ],
    imports: [
        ScrollingModule,
        MatTableModule,
        NgxCustomScrollbarModule,
        BrowserModule,
        // TODO check for angular >=17: Make sure you configure
        // setupTestingRouter, canceledNavigationResolution, paramsInheritanceStrategy, titleStrategy, urlUpdateStrategy, urlHandlingStrategy, and malformedUriErrorHandler
        // in (provideRouter or) RouterModule.forRoot since these properties are now not part of the Router's public API
        RouterModule.forRoot([
            {
                path: "",
                component: VerticalScrollComponent
            },
            {
                path: "virtual",
                component: CdkVirtualScrollOverviewExampleComponent
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
