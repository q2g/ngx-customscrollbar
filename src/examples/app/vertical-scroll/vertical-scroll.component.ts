import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewportControl } from 'ngx-customscrollbars';

@Component({
    selector: 'app-vertical-scroll',
    templateUrl: 'vertical-scroll.component.html',
    styleUrls: ['./vertical-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class VerticalScrollComponent implements OnInit {

    public loading = false;

    public items: Array<string | number> = Array.from({ length: 300 }, (val, index) => index);

    public ngOnInit() {

        // super dirty fake add remove container
        window.setTimeout(() => {
            this.loading = true;

            window.setTimeout(() => {
                this.items = Array.from({ length: 100 }, (val, index) => index);
                this.loading = false;
            }, 100);
        }, 100);
    }
}
