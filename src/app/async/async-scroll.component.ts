import { Component, OnInit } from '@angular/core';
import { ViewportControl } from 'scrollbars';
import { delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
    selector: 'app-horizontal-scroll',
    templateUrl: 'async-scroll.component.html',
    styleUrls: ['./async-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class AsyncScrollComponent implements OnInit {

    public items: Array<string | number> = [];

    public constructor(
        private viewportControl: ViewportControl
    ) { }

    public resetScrollbar() {
        this.viewportControl.reset();
    }

    public ngOnInit() {
        this.reload();
    }

    public reload() {
        this.loadData().subscribe((data) => {
            this.items = data;
        });
    }

    private loadData(): Observable<number[]> {
        const data = Array.from({ length: Math.random() * 100 }, (val, index) => index);
        return of(data).pipe(delay(Math.random() * 1000));
    }
}
