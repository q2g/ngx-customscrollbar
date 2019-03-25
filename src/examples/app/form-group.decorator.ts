import { Injector, Component, Inject } from "@angular/core";
import { AppComponent } from "./app.component";

export function FormGroup(): ClassDecorator {

    return (classConstructor) => {

        return null;

        // das er sich automatisch registriert ???
        if ( classConstructor.prototype.hasOwnProperty("ngOnInit")) {

            const original = classConstructor.prototype.ngOnInit;
            classConstructor.prototype.ngOnInit = function(...args) {
                original.apply(this, args);
            };
        }
    };
}
