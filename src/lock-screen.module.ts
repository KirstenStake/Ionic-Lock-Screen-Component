
import { LockScreenComponent } from './components/lock-screen-component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        LockScreenComponent
    ],
    exports: [
        LockScreenComponent
    ]
})
export class ProductBuyPageModule {
}