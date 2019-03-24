import { Directive, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { Platform } from "@angular/cdk/platform";

/**
 * dont show element if we can support styles of scrollbar
 * only via css. Possible with webkit / BLINK (chrome, chromium, opera)
 */
@Directive({ selector: "[ngxCustomScrollbarHideOnNativeStyle]"})
export class NgxCustomScrollbarHideOnNativeStyleDirective {

    constructor(
        /** The view container to add items to. */
        private viewContainerRef: ViewContainerRef,
        /** The template to use when stamping out new items. */
        private template: TemplateRef<any>,
        /** platform */
        private platform: Platform
    ) { }

    @Input()
    set q2gScrollbarHideOnNativeStyle(hideOnNative: boolean) {
        if (!this.platform.WEBKIT && !this.platform.BLINK || hideOnNative === false) {
            this.viewContainerRef.createEmbeddedView(this.template);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
