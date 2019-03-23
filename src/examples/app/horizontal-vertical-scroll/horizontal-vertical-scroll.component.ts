import { Component } from '@angular/core';
import { ViewportControl } from 'ngx-customscrollbars';

@Component({
    selector: 'app-horizontal-vertical-scroll',
    templateUrl: 'horizontal-vertical-scroll.component.html',
    styleUrls: ['./horizontal-vertical-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class HorizontalVerticalScrollComponent {

    public items: Array<string | number> = Array.from({ length: 30 }, (val, index) => index);

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
