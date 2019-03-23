/**
 * watches dom for changes and notifiy
 * viewport control to update
 */
export interface IDomWatcher {

    connect(el: HTMLElement);

    disconnect();
}
