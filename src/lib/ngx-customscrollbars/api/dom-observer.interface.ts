/**
 * watches dom for changes and notifiy
 * viewport control to update
 */
export interface IDomObserver {

    connect(el: HTMLElement);

    disconnect();
}
