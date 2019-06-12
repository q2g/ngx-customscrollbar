import { Component, OnInit } from "@angular/core";
import { ViewportControl } from "ngx-customscrollbars";

/** @title Basic virtual scroll */
@Component({
  selector: "app-cdk-virtual-scroll-overview-example",
  styleUrls: ["virtual-scroll.component.scss"],
  templateUrl: "virtual-scroll.component.html",
  viewProviders: [ViewportControl]
})
export class CdkVirtualScrollOverviewExampleComponent implements OnInit {
  public items;

  public ngOnInit() {
    this.items = Array.from({ length: 15 }).map((_, i) => `Item #${i}`);
  }
}
