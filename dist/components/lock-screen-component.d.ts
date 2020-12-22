import { Events, NavParams, NavController } from 'ionic-angular';
export declare class LockScreenComponent {
    events: Events;
    private navCtrl;
    private navParams;
    _showLockScreen: boolean;
    ACDelbuttons: boolean;
    passcodeWrong: boolean;
    touchId: boolean;
    passcodeAttempts: number;
    enteredPasscode: any;
    passcode: string;
    passcodeLabel: string;
    touchLabel: string;
    onCorrect: any;
    onWrong: any;
    selected: any;
    constructor(events: Events, navCtrl: NavController, navParams: NavParams);
    allClear(): void;
    remove(): void;
    digit(digit: any): void;
}
