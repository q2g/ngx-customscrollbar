// import { Injector, Component, Inject } from "@angular/core";
// import { AppComponent } from "./app.component";

export function FormGroup(): ClassDecorator {

    return (classConstructor) => {

        return null;

        //#region das Folgende wurde auskommentiert, da seit "return null" nicht mehr erreichbar.
        // damit er sich automatisch registriert ???
        if ( classConstructor.prototype.hasOwnProperty("ngOnInit")) {

            const original = classConstructor.prototype.ngOnInit;
            classConstructor.prototype.ngOnInit = function(...args) {
                original.apply(this, args);
            };
        }
        //#endregion
    };
}
