import { Component } from "@angular/core";
import { ViewportControl } from "lib/public_api";

@Component({
    selector: "app-horizontal-scroll",
    templateUrl: "horizontal-scroll.component.html",
    styleUrls: ["./horizontal-scroll.component.scss"],
    viewProviders: [ViewportControl]
})
export class HorizontalScrollComponent {

    public items: Array<string | number> = Array.from({ length: 10 }, (val, index) => index);

    public constructor(
        private viewportControl: ViewportControl
    ) { }

    public resetScrollbar() {
        this.viewportControl.reset();
    }

    /**
     * simulate add new content to component
     *
     * @memberof AppComponent
     */
    public addContent() {
        this.items.push(this.items.length);
    }

    /**
     * simulate remove elements
     *
     * @memberof ScrollbarTestComponent
     */
    public removeContent() {
        this.items.pop();
    }

    public changeItemContent() {
        this.items[Math.round(Math.random() * (this.items.length - 1))] =
            `dsaldksaödas
            dsadklöaskdölasdsa
            dsadklöaskdölasdsa
            ddsadjsakldjlsadjsa
            dsajkdjsakldjasdlksajdkajsdlas
            dsadklöaskdölasdsa
            ddsadjsakldjlsadjsa
            dsajkdjsakldjasdlksajdkajsdlas
            dsadklöaskdölasdsa
            ddsadjsakldjlsadjsa
            dsajkdjsakldjasdlksajdkajsdlas
            dsadklöaskdölasdsa
            ddsadjsakldjlsadjsa
            dsajkdjsakldjasdlksajdkajsdlas
        `;
    }
}
