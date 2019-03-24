
import { IDomObserver, IViewportControl } from '../../api';

/**
 * watches dom for mutations, something has been added or removed
 * content changes and notfiy viewport control to update
 */
export class DomMutationObserver implements IDomObserver {

    private mutationObserver: MutationObserver;

    public constructor(
        private viewportControl: IViewportControl
    ) { }

    connect(el: HTMLElement): void {
        this.mutationObserver = new MutationObserver((m) => {
            this.viewportControl.update();
        });

        this.mutationObserver.observe(el, {
            attributes: true,
            attributeFilter: ['style'],
            characterData: true,
            childList: true,
            subtree: true,
        });
    }

    disconnect() {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
    }
}
