import { Component } from "@angular/core";
import { ViewportControl } from "lib/public_api";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss", "./scrollbar.scss"],
    viewProviders: [ViewportControl],
    standalone: false
})
export class AppComponent {
    public constructor() { }
}
