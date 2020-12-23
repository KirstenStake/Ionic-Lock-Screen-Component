import { NavParams, NavController, Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
/* HTML Template */
var LOCK_SCREEN_TEMPLATE = "\n      <div class=\"ILS_lock\" [ngClass]=\"!_showLockScreen ?  'ILS_lock-hidden' : ''\">\n        <div class=\"ILS_label-row ISL_label_title\">\n          {{ !firstPasswordSet ? passcodeLabel : secondPasscodeLabel }}\n        </div>\n        <div *ngIf=\"passcodeSubTitle\" class=\"ILS_label-row ISL_label_subTitle\">\n            {{passcodeSubTitle}}\n        </div>\n        <div class=\"ILS_circles-row\" [ngClass]=\"passcodeWrong ?  'ILS_shake' : ''\">\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>0 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>1 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>2 ? 'ILS_full' : ''\"></div>\n          <div class=\"ILS_circle\" [ngClass]=\" enteredPasscode.length>3 ? 'ILS_full' : ''\"></div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(1)\" class=\"ILS_digit\">1</div>\n          <div (click)=\"digit(2)\" class=\"ILS_digit\">2</div>\n          <div (click)=\"digit(3)\" class=\"ILS_digit\">3</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(4)\" class=\"ILS_digit\">4</div>\n          <div (click)=\"digit(5)\" class=\"ILS_digit\">5</div>\n          <div (click)=\"digit(6)\" class=\"ILS_digit\">6</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div (click)=\"digit(7)\" class=\"ILS_digit\">7</div>\n          <div (click)=\"digit(8)\" class=\"ILS_digit\">8</div>\n          <div (click)=\"digit(9)\" class=\"ILS_digit\">9</div>\n        </div>\n        <div class=\"ILS_numbers-row\">\n          <div *ngIf=\"onAdditionalLink\" (click)=\"additionalLink()\" class=\"ILS_digit ISL_label_link\">\n          {{ additionalLinkTitle }}\n          </div>\n          <div (click)=\"digit(0)\" class=\"ILS_digit\">0</div>\n          <div *ngIf=\"ACDelbuttons\" (click)=\"remove()\" class=\"ILS_digit ILS_del\"></div>\n        </div>\n      </div>\n    ";
/* Style */
var LOCK_SCREEN_STYLE = "\n          /* Animations*/\n          @keyframes ILS_shake {\n            from, to {\n              transform: translate3d(0, 0, 0);\n            }\n            10%, 30%, 50%, 70%, 90% {\n              transform: translate3d(-10px, 0, 0);\n            }\n            20%, 40%, 60%, 80% {\n              transform: translate3d(10px, 0, 0);\n            }\n          }\n          @keyframes ILS_buttonPress {\n            0% {\n              background-color: #acafb2;\n            }\n            100% {\n              background-color: #f9f9f9;\n            }\n          }\n          /* Lock Screen Layout*/\n          .ILS_lock {\n            display: flex;\n            flex-direction: column;\n            justify-content: flex-end;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            z-index: 999;\n            padding: 45px 0;\n            background-color: #f9f9f9;\n          }\n          .ILS_lock-hidden {\n            display: none;\n          }\n          .ILS_label-row {\n            height: 50px;\n            width: 100%;\n            text-align: center;\n            padding-top: 10px;\n            color: #141414;\n          }\n          .ISL_label_title {\n            font-size: 34px;\n            // margin-bottom: 0.5em;\n            text-transform: uppercase;\n          }\n          .ISL_label_subTitle {\n            font-size: 14px;\n            padding-top: 0;\n          }\n          .ISL_label_link {\n            color: #666666 !important;\n            font-size: 14px !important;\n            padding-top: 26px !important;\n            background-color: transparent !important;\n          }\n          .ILS_del {\n            padding: 0 !important;\n            margin: 25px 48px !important;\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            width: 14px !important;\n            height: 14px !important;\n            transform: scale(var(--ggs,1));\n            border: 2px solid;\n            border-left: 0;\n            color: #666666 !important;\n            border-radius: 0px !important;\n            border-top-right-radius: 2px !important;\n            background-color: transparent !important;\n            border-bottom-right-radius: 2px !important;\n          }\n            .ILS_del::after,\n            .ILS_del::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute\n            }\n           \n            .ILS_del::before {\n            background:\n            linear-gradient( to left,\n            currentColor 18px,transparent 0)\n            no-repeat center center/10px 2px;\n            border-right: 3px solid transparent;\n            box-shadow: inset 0 0 0 2px;\n            right: 2px;\n            bottom: 1px;\n            width: 8px;\n            height: 8px;\n            border-left: 3px solid transparent;\n            transform: rotate(45deg)\n            }\n           \n            .ILS_del::after {\n            width: 10px;\n            height: 10px;\n            border-top: 2px solid;\n            border-left: 2px solid;\n            border-top-left-radius: 1px;\n            transform: rotate(-45deg);\n            top: 0;\n            left: -5px\n            } \n          .ILS_circles-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 200px;\n          }\n          .ILS_circle {\n            background-color: transparent;\n            border-radius: 50%;\n            width: 12px;\n            height: 12px;\n            border: solid 1.5px #141414;\n            margin: 0 15px;\n          }\n          .ILS_numbers-row {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            width: 100%;\n            height: 85px;\n          }\n          .ILS_digit {\n            margin: 0 20px;\n            width: 68px;\n            border-radius: 50%;\n            height: 68px;\n            text-align: center;\n            padding-top: 22px;\n            font-size: 25px;\n            color: #141414;\n            background-color: #eaebeb;\n          }\n          .ILS_digit.activated {\n            -webkit-animation-name: ILS_buttonPress;\n            animation-name: ILS_buttonPress;\n            -webkit-animation-duration: 0.3;\n            animation-duration: 0.3s;\n          }\n          .ILS_full {\n            background-color:#141414!important;\n          }\n          .ILS_shake {\n            -webkit-animation-name: ILS_shake;\n            animation-name: ILS_shake;\n            -webkit-animation-duration: 0.5;\n            animation-duration: 0.5s;\n            -webkit-animation-fill-mode: both;\n            animation-fill-mode: both;\n          }\n          \n";
var LockScreenComponent = (function () {
    function LockScreenComponent(events, navParams, navCtrl) {
        this.events = events;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.passcodeAttempts = 0;
        this.enteredPasscode = '';
        this._showLockScreen = true;
        this.passcode = navParams.data.code;
        this.touchId = navParams.data.touchId || false;
        this.setPasscode = navParams.data.setPasscode || false;
        this.ACDelbuttons = navParams.data.ACDelbuttons || false;
        this._passcodeFallBack = navParams.data.pinFallBack || false;
        this.onWrong = navParams.data.onWrong || null;
        this.onCorrect = navParams.data.onCorrect || null;
        this.onAdditionalLink = navParams.data.onAdditionalLink || null;
        this.passcodeSubTitle = navParams.data.passcodeSubTitle || null;
        this.additionalLinkTitle = navParams.data.additionalLinkTitle || null;
        this.touchLabel = navParams.data.passcodeLabel || 'Verify Passcode';
        this.passcodeLabel = navParams.data.passcodeLabel || 'Enter Passcode';
        this.secondPasscodeLabel = navParams.data.secondPasscodeLabel || 'Confirm passcode';
    }
    LockScreenComponent.prototype.additionalLink = function () {
        this.onAdditionalLink && this.onAdditionalLink();
    };
    LockScreenComponent.prototype._allClear = function () {
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
        if (!this.setPasscode) {
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
        }
        else {
            if (this.enteredPasscode.length >= 4) {
                if (!this.firstPasswordSet) {
                    this._firstSetPasscode = this.enteredPasscode;
                    this.firstPasswordSet = true;
                    this._allClear();
                }
                else {
                    if (this.enteredPasscode === this._firstSetPasscode) {
                        this.onCorrect && this.onCorrect(Md5.hashStr(this.enteredPasscode));
                        this.enteredPasscode = '';
                        this.passcodeAttempts = 0;
                        this._showLockScreen = false;
                        this._showLockScreen = false;
                        this.navCtrl.pop();
                    }
                    else {
                        this.passcodeWrong = true;
                        this.passcodeAttempts++;
                        this.onWrong && this.onWrong(this.passcodeAttempts);
                        setTimeout(function () {
                            _this._firstSetPasscode = null;
                            _this.enteredPasscode = '';
                            _this.passcodeWrong = false;
                            _this.firstPasswordSet = false;
                        }, 800);
                    }
                }
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
        { type: NavParams, },
        { type: NavController, },
    ]; };
    return LockScreenComponent;
}());
export { LockScreenComponent };
//# sourceMappingURL=lock-screen-component.js.map