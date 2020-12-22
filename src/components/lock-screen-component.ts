/**
 * [Auto Generated] Created by :Carson. Chen
 */
import { Component } from '@angular/core';
import { Events, NavParams, NavController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';


/* HTML Template */
const LOCK_SCREEN_TEMPLATE = `
      <div class="ILS_lock" [ngClass]="!_showLockScreen ?  'ILS_lock-hidden' : ''">
        <div class="ILS_label-row">
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
          <div *ngIf="ACDelbuttons" (click)="allClear()" class="ILS_digit ILS_ac">AC</div>
          <div (click)="digit(0)" class="ILS_digit">0</div>
          <div *ngIf="ACDelbuttons" (click)="remove()" class="ILS_digit ILS_del">DEL</div>
        </div>
        <div *ngIf="onAdditionalLink" class="ILS_label-row ISL_label_forgot">
            <a (click)="additionalLink()">{{additionalLinkTitle}}</a>
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
              background-color: #E0E0E0;
            }
            100% {
              background-color: #F1F1F1;
            }
          }
          /* Lock Screen Layout*/
          .ILS_lock {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            background-color: #F1F1F1;
          }
          .ILS_lock-hidden {
            display: none;
          }
          .ILS_label-row {
            height: 50px;
            width: 100%;
            text-align: center;
            font-size: 23px;
            padding-top: 10px;
            color: #464646;
          }
          .ILS_circles-row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 60px;
          }
          .ILS_circle {
            background-color: #F1F1F1!important;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            border:solid 1px #464646;
            margin: 0 15px;
          }
          .ILS_numbers-row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 100px;
          }
          .ILS_digit {
            margin: 0 14px;
            width: 80px;
            border-radius: 10%;
            height: 80px;
            text-align: center;
            padding-top: 29px;
            font-size: 21px;
            color: #464646;
            background-color: #bed7ef;
          }
          .ILS_digit.activated {
            -webkit-animation-name: ILS_buttonPress;
            animation-name: ILS_buttonPress;
            -webkit-animation-duration: 0.3;
            animation-duration: 0.3s;
          }
          .ILS_ac {
            color: #464646;
            background-color: #F8F8F8;
            }
          .ILS_del {
            color: #464646;
            background-color: #F8F8F8;
            }
          .ILS_full {
            background-color:#464646!important;
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

    _showLockScreen: boolean;
    ACDelbuttons: boolean;
    passcodeWrong: boolean;
    setPasscode: boolean;
    touchId: boolean;
    firstPasswordSet: boolean;

    passcodeAttempts: number = 0;

    passcode: string;
    passcodeLabel: string;
    secondPasscodeLabel: string;
    passcodeSubTitle: string;
    additionalLinkTitle: string;
    touchLabel: string;
    _firstSetPasscode: string;

    onCorrect: any;
    onWrong: any;
    selected: any;
    onAdditionalLink: any;
    enteredPasscode: any = '';

    constructor(
        public events: Events,
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this._showLockScreen = true;
        this.passcode = navParams.data.code;
        this.touchId = navParams.data.touchId || false;
        this.setPasscode = navParams.data.setPasscode || false;
        this.ACDelbuttons = navParams.data.ACDelbuttons || false;

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

    allClear(): void {
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
                    this.allClear();
                } else {
                    if (this.enteredPasscode === this._firstSetPasscode) {
                        this.onCorrect && this.onCorrect(this.enteredPasscode);
                        this.enteredPasscode = '';
                        this.passcodeAttempts = 0;
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
