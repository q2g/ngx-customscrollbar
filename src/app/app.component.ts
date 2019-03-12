import { Component } from '@angular/core';
import { ViewportControl } from 'projects/scrollbars/src/lib/provider/viewport.control';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    viewProviders: [ViewportControl]
})
export class AppComponent {

    public constructor(
    ) {
    }
}
