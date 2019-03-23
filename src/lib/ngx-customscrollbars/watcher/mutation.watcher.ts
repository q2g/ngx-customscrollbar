
import { DomHelper } from '../helper';
import { ViewportControl } from '../provider/viewport.control';
import { IDomWatcher } from './dom.watcher.interface';

/**
 * watches dom for mutations, something has been added or removed
 * content changes and notfiy viewport control to update
 */
export class DomMutationWatcher implements IDomWatcher {

    private mutationObserver: MutationObserver;
    private dimension;
    private node: HTMLElement;

    public constructor(
        private viewportControl: ViewportControl
    ) { }

    connect(el: HTMLElement): void {

        this.dimension = this.viewportControl.viewportDimension;
        this.node = el;

        this.mutationObserver = new MutationObserver(() => {
            if (this.requireUpdate()) {
                this.viewportControl.update();
            }
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

    /**
     * check for changes we have to react for since this changes the
     * height of the scrollContainer
     */
    private requireUpdate(): boolean {

        const newDimensions = DomHelper.getScrollContainerMeasure(this.node);

        let needsUpdate = true;
        needsUpdate = this.dimension.height !== newDimensions.height;
        needsUpdate = needsUpdate || this.dimension.width !== newDimensions.width;
        needsUpdate = needsUpdate || this.dimension.scrollHeight !== newDimensions.scrollHeight;
        needsUpdate = needsUpdate || this.dimension.scrollWidth !== newDimensions.scrollWidth;

        /** write new dimensions */
        this.dimension = newDimensions;

        return needsUpdate;
    }
}
