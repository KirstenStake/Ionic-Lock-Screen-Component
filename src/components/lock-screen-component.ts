import { NavParams, NavController, Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

/* HTML Template */
const LOCK_SCREEN_TEMPLATE = `
      <div class="ILS_lock" [ngClass]="!_showLockScreen ?  'ILS_lock-hidden' : ''">
      <div class="ISL_input-content">
        <div class="ILS_label-row ISL_label_title">
        {{ !firstPasswordSet ? passcodeLabel : secondPasscodeLabel }}
        </div>
        <div *ngIf="passcodeSubTitle" class="ILS_label-row ISL_label_subTitle">
            {{passcodeSubTitle}}
        </div>
        <div class="ILS_circles-row" [ngClass]="passcodeWrong ?  'ILS_shake' : ''">
        <div class="ILS_circle" [ngClass]=" enteredPasscode.length>0 ? 'ILS_full' : ''"></div>
        <div class="ILS_circle" [ngClass]=" enteredPasscode.length>1 ? 'ILS_full' : ''"></div>
        <div class="ILS_circle" [ngClass]=" enteredPasscode.length>2 ? 'ILS_full' : ''"></div>
        <div class="ILS_circle" [ngClass]=" enteredPasscode.length>3 ? 'ILS_full' : ''"></div>
        </div>
      </div>
        <div class="ILS_numbers-row">
          <div (click)="digit(1)" class="ILS_digit">1</div>
          <div (click)="digit(2)" class="ILS_digit">2</div>
          <div (click)="digit(3)" class="ILS_digit">3</div>
        </div>
        <div class="ILS_numbers-row">
          <div (click)="digit(4)" class="ILS_digit">4</div>
          <div (click)="digit(5)" class="ILS_digit">5</div>
          <div (click)="digit(6)" class="ILS_digit">6</div>
        </div>
        <div class="ILS_numbers-row">
          <div (click)="digit(7)" class="ILS_digit">7</div>
          <div (click)="digit(8)" class="ILS_digit">8</div>
          <div (click)="digit(9)" class="ILS_digit">9</div>
        </div>
        <div class="ILS_numbers-row">
          <div *ngIf="onAdditionalLink" (click)="additionalLink()" class="ILS_digit ISL_label_link">
          {{ additionalLinkTitle }}
          </div>
          <div (click)="digit(0)" class="ILS_digit">0</div>
          <div *ngIf="ACDelbuttons" (click)="remove()" class="ILS_digit ILS_del"></div>
        </div>
      </div>
    `;

/* Style */
const LOCK_SCREEN_STYLE = `
          /* Animations*/
          @keyframes ILS_shake {
            from, to {
              transform: translate3d(0, 0, 0);
            }
            10%, 30%, 50%, 70%, 90% {
              transform: translate3d(-10px, 0, 0);
            }
            20%, 40%, 60%, 80% {
              transform: translate3d(10px, 0, 0);
            }
          }
          @keyframes ILS_buttonPress {
            0% {
              background-color: #acafb2;
            }
            100% {
              background-color: #f9f9f9;
            }
          }
          /* Lock Screen Layout*/
          .ILS_lock {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            padding: 45px 0;
            background-color: #f9f9f9;
          }
          .ILS_lock-hidden {
            display: none;
          }
          .ISL_input-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
          }
          .ILS_label-row {
            height: 50px;
            width: 100%;
            text-align: center;
            padding-top: 10px;
            color: #141414;
          }
          .ISL_label_title {
            font-size: 34px;
            text-transform: uppercase;
          }
          .ISL_label_subTitle {
            font-size: 14px;
            padding-top: 0;
          }
          .ISL_label_link {
            color: #666666 !important;
            font-size: 14px !important;
            padding-top: 26px !important;
            background-color: transparent !important;
          }
          .ILS_del {
            padding: 0 !important;
            margin: 25px 48px !important;
            box-sizing: border-box;
            position: relative;
            display: block;
            width: 14px !important;
            height: 14px !important;
            transform: scale(var(--ggs,1));
            border: 2px solid;
            border-left: 0;
            color: #666666 !important;
            border-radius: 0px !important;
            border-top-right-radius: 2px !important;
            background-color: transparent !important;
            border-bottom-right-radius: 2px !important;
          }
            .ILS_del::after,
            .ILS_del::before {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute
            }
           
            .ILS_del::before {
            background:
            linear-gradient( to left,
            currentColor 18px,transparent 0)
            no-repeat center center/10px 2px;
            border-right: 3px solid transparent;
            box-shadow: inset 0 0 0 2px;
            right: 2px;
            bottom: 1px;
            width: 8px;
            height: 8px;
            border-left: 3px solid transparent;
            transform: rotate(45deg)
            }
           
            .ILS_del::after {
            width: 10px;
            height: 10px;
            border-top: 2px solid;
            border-left: 2px solid;
            border-top-left-radius: 1px;
            transform: rotate(-45deg);
            top: 0;
            left: -5px
            } 
          .ILS_circles-row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 50px;
          }
          .ILS_circle {
            background-color: transparent;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            border: solid 1.5px #141414;
            margin: 0 15px;
          }
          .ILS_numbers-row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 85px;
          }
          .ILS_digit {
            margin: 0 20px;
            width: 68px;
            border-radius: 50%;
            height: 68px;
            text-align: center;
            padding-top: 22px;
            font-size: 25px;
            color: #141414;
            background-color: #eaebeb;
          }
          .ILS_digit.activated {
            -webkit-animation-name: ILS_buttonPress;
            animation-name: ILS_buttonPress;
            -webkit-animation-duration: 0.3;
            animation-duration: 0.3s;
          }
          .ILS_full {
            background-color:#141414!important;
          }
          .ILS_shake {
            -webkit-animation-name: ILS_shake;
            animation-name: ILS_shake;
            -webkit-animation-duration: 0.5;
            animation-duration: 0.5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          
`;

@Component({
    selector: 'lock-screen',
    template: LOCK_SCREEN_TEMPLATE,
    styles: [LOCK_SCREEN_STYLE]
})
export class LockScreenComponent {

    touchId: boolean;
    setPasscode: boolean;       // initiate initial set passcode journey
    ACDelbuttons: boolean;
    passcodeWrong: boolean;
    _showLockScreen: boolean;
    firstPasswordSet: boolean;
    _passcodeFallBack: boolean;      // use pin page if biometrics fail

    passcodeAttempts: number = 0;

    passcode: string;
    touchLabel: string;
    passcodeLabel: string;
    passcodeSubTitle: string;
    _firstSetPasscode: string;
    additionalLinkTitle: string;
    secondPasscodeLabel: string;

    onWrong: any;
    selected: any;
    onCorrect: any;
    onAdditionalLink: any;
    enteredPasscode: any = '';

    constructor(
        public events: Events,
        private navParams: NavParams,
        private navCtrl: NavController,
    ) {
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

    additionalLink(): void {
        this.onAdditionalLink && this.onAdditionalLink();
    }

    _allClear(): void {
        this.enteredPasscode = "";
    }

    remove(): void {
        this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    }

    digit(digit: any): void {
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
                } else {
                    this.passcodeWrong = true;
                    this.passcodeAttempts++;
                    this.onWrong && this.onWrong(this.passcodeAttempts);
                    setTimeout(() => {
                        this.enteredPasscode = '';
                        this.passcodeWrong = false;
                    }, 800);
                }
            }
        } else {
            if (this.enteredPasscode.length >= 4) {
                if (!this.firstPasswordSet) {
                    this._firstSetPasscode = this.enteredPasscode;
                    this.firstPasswordSet = true;
                    this._allClear();
                } else {
                    if (this.enteredPasscode === this._firstSetPasscode) {
                        this.onCorrect && this.onCorrect(Md5.hashStr(this.enteredPasscode));
                        this.enteredPasscode = '';
                        this.passcodeAttempts = 0;
                        this._showLockScreen = false;
                        this._showLockScreen = false;
                        this.navCtrl.pop();
                    } else {
                        this.passcodeWrong = true;
                        this.passcodeAttempts++;
                        this.onWrong && this.onWrong(this.passcodeAttempts);
                        setTimeout(() => {
                            this._firstSetPasscode = null;
                            this.enteredPasscode = '';
                            this.passcodeWrong = false;
                            this.firstPasswordSet = false;
                        }, 800);
                    }
                }
            }
        }
    }
}
