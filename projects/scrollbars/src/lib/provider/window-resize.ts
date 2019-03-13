import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, fromEvent, Subscription } from 'rxjs';
import { debounceTime, throttleTime, debounce } from 'rxjs/operators';

/**
 *
 */
@Injectable({ providedIn: 'root' })
export class WindowResize {

    /**
     * window resize event stream
     */
    private windowResize$: Observable<Event>;

    /**
     * shared stream which one is registered on windowResize Stream
     * all others will subscribe to shared stream so we can ensure
     * only one window resize event exists
     */
    private shared$: Subject<any>;

    /**
     * current subscriber count on shared stream, the first subscriber
     * will trigger shared stream registration on window resize stream
     * if all subscribers are removed we automatically remove from
     */
    private subscriberCount = 0;

    /**
     * the subscription to window resize stream
     * will be canceled if no one gets interrested anymore
     */
    private resizeSubscription: Subscription;

    constructor(
        private zone: NgZone
    ) {
        this.windowResize$ = fromEvent(window, 'resize');
        this.shared$ = new Subject();
    }

    /**
     * create shared event stream and register to this
     */
    public onChange(): Observable<void> {
        // subscribe
        return Observable.create(observer => {
            this.subscriberCount++;
            const event$ = this.shared$.subscribe(observer);

            if (this.subscriberCount === 1) {
                this.subscribeToWindowResizeEvent();
            }

            // unsubscribe
            return () => {
                event$.unsubscribe();
                this.subscriberCount--;
                if (this.subscriberCount <= 0) {
                    this.resizeSubscription.unsubscribe();
                }
            };
        });
    }

    /**
     * register to window resize events
     */
    private subscribeToWindowResizeEvent(): void {
        this.zone.runOutsideAngular(() => {
            this.resizeSubscription = this.windowResize$
                .subscribe(() => this.shared$.next());
        });
    }
}
