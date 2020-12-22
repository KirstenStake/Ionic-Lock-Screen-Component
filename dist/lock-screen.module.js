import { LockScreenComponent } from './components/lock-screen-component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
var LockScreenModule = (function () {
    function LockScreenModule() {
    }
    LockScreenModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                    ],
                    declarations: [
                        LockScreenComponent
                    ],
                    exports: [
                        LockScreenComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    LockScreenModule.ctorParameters = function () { return []; };
    return LockScreenModule;
}());
export { LockScreenModule };
//# sourceMappingURL=lock-screen.module.js.map