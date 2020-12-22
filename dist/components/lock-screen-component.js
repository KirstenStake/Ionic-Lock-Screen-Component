/**
 * [Auto Generated] Created by :Carson. Chen
 */
import { Component } from '@angular/core';
import { Events, NavParams, NavController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
/* HTML Template */
var LOCK_SCREEN_TEMPLATE = "\n      <div class=\"ILS_lock\" [ngClass]=\"!_showLockScreen ?  'ILS_lock-hidden' : ''\">\n        <div class=\"ILS_label-row\">\n          {{passcodeLabel}}\n        </div>\n        <div class=\"ILS_circles-row\" [ngClass]=\"passcodeWrong ?  'ILS_shake' : ''\">\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>0 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>1 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>2 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>3 ? 'ILS_full' : ''\"></div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(1)\" class=\"ILS_digit\">1</div>\n          <div (click)=\"digit(2)\" class=\"ILS_digit\">2</div>\n          <div (click)=\"digit(3)\" class=\"ILS_digit\">3</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(4)\" class=\"ILS_digit\">4</div>\n          <div (click)=\"digit(5)\" class=\"ILS_digit\">5</div>\n          <div (click)=\"digit(6)\" class=\"ILS_digit\">6</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(7)\" class=\"ILS_digit\">7</div>\n          <div (click)=\"digit(8)\" class=\"ILS_digit\">8</div>\n          <div (click)=\"digit(9)\" class=\"ILS_digit\">9</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div *ngIf=\"ACDelbuttons\" (click)=\"allClear()\" class=\"ILS_digit ILS_ac\">AC</div>\n          <div (click)=\"digit(0)\" class=\"ILS_digit\">0</div>\n          <div *ngIf=\"ACDelbuttons\" (click)=\"remove()\" class=\"ILS_digit ILS_del\">DEL</div>\n        </div>\n      </div>\n    ";
/* Style */
var LOCK_SCREEN_STYLE = "\n          /* Animations*/\n          @keyframes ILS_shake {\n            from, to {\n              transform: translate3d(0, 0, 0);\n            }\n            10%, 30%, 50%, 70%, 90% {\n              transform: translate3d(-10px, 0, 0);\n            }\n            20%, 40%, 60%, 80% {\n              transform: translate3d(10px, 0, 0);\n            }\n          }\n          @keyframes ILS_buttonPress {\n            0% {\n              background-color: #E0E0E0;\n            }\n            100% {\n              background-color: #F1F1F1;\n            }\n          }\n          /* Lock Screen Layout*/\n          .ILS_lock {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            z-index: 999;\n            background-color: #F1F1F1;\n          }\n          .ILS_lock-hidden {\n            display: none;\n          }\n          .ILS_label-row {\n            height: 50px;\n            width: 100%;\n            text-align: center;\n            font-size: 23px;\n            padding-top: 10px;\n            color: #464646;\n          }\n          .ILS_circles-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 60px;\n          }\n          .ILS_circle {\n            background-color: #F1F1F1!important;\n            border-radius: 50%;\n            width: 10px;\n            height: 10px;\n            border:solid 1px #464646;\n            margin: 0 15px;\n          }\n          .ILS_numbers-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 100px;\n          }\n          .ILS_digit {\n            margin: 0 14px;\n            width: 80px;\n            border-radius: 10%;\n            height: 80px;\n            text-align: center;\n            padding-top: 29px;\n            font-size: 21px;\n            color: #464646;\n            background-color: #bed7ef;\n          }\n          .ILS_digit.activated {\n            -webkit-animation-name: ILS_buttonPress;\n            animation-name: ILS_buttonPress;\n            -webkit-animation-duration: 0.3;\n            animation-duration: 0.3s;\n          }\n          .ILS_ac {\n            color: #464646;\n            background-color: #F8F8F8;\n            }\n          .ILS_del {\n            color: #464646;\n            background-color: #F8F8F8;\n            }\n          .ILS_full {\n            background-color:#464646!important;\n          }\n          .ILS_shake {\n            -webkit-animation-name: ILS_shake;\n            animation-name: ILS_shake;\n            -webkit-animation-duration: 0.5;\n            animation-duration: 0.5s;\n            -webkit-animation-fill-mode: both;\n            animation-fill-mode: both;\n          }\n";
var LockScreenComponent = (function () {
    function LockScreenComponent(events, navCtrl, navParams) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.passcodeAttempts = 0;
        this.enteredPasscode = '';
        this._showLockScreen = true;
        this.touchId = navParams.data.touchId || false;
        this.ACDelbuttons = navParams.data.ACDelbuttons || false;
        this.passcode = navParams.data.code;
        this.onCorrect = navParams.data.onCorrect || null;
        this.onWrong = navParams.data.onWrong || null;
        this.passcodeLabel = navParams.data.passcodeLabel || 'Enter Passcode';
        this.touchLabel = navParams.data.passcodeLabel || 'Verify Passcode';
    }
    LockScreenComponent.prototype.allClear = function () {
        this.enteredPasscode = "";
    };
    LockScreenComponent.prototype.remove = function () {
        this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    };
    LockScreenComponent.prototype.digit = function (digit) {
        var _this = this;
        this.selected = +digit;
        if (this.passcodeWrong) {
            return;
        }
        this.enteredPasscode += '' + digit;
        if (this.enteredPasscode.length >= 4) {
            this.enteredPasscode = Md5.hashStr(this.enteredPasscode);
            if (this.enteredPasscode === '' + this.passcode) {
                this.enteredPasscode = '';
                this.passcodeAttempts = 0;
                this.onCorrect && this.onCorrect();
                this._showLockScreen = false;
                this.navCtrl.pop();
            }
            else {
                this.passcodeWrong = true;
                this.passcodeAttempts++;
                this.onWrong && this.onWrong(this.passcodeAttempts);
                setTimeout(function () {
                    _this.enteredPasscode = '';
                    _this.passcodeWrong = false;
                }, 800);
            }
        }
    };
    LockScreenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lock-screen',
                    template: LOCK_SCREEN_TEMPLATE,
                    styles: [LOCK_SCREEN_STYLE]
                },] },
    ];
    /** @nocollapse */
    LockScreenComponent.ctorParameters = function () { return [
        { type: Events, },
        { type: NavController, },
        { type: NavParams, },
    ]; };
    return LockScreenComponent;
}());
export { LockScreenComponent };
//# sourceMappingURL=lock-screen-component.js.map