import { LockScreenComponent } from './components/lock-screen-component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
var ProductBuyPageModule = (function () {
    function ProductBuyPageModule() {
    }
    ProductBuyPageModule.decorators = [
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
    ProductBuyPageModule.ctorParameters = function () { return []; };
    return ProductBuyPageModule;
}());
export { ProductBuyPageModule };
//# sourceMappingURL=lock-screen.module.js.map