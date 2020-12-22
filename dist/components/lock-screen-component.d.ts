import { Events, NavParams, NavController } from 'ionic-angular';
export declare class LockScreenComponent {
    events: Events;
    private navCtrl;
    private navParams;
    _showLockScreen: boolean;
    ACDelbuttons: boolean;
    passcodeWrong: boolean;
    setPasscode: boolean;
    touchId: boolean;
    firstPasswordSet: boolean;
    passcodeAttempts: number;
    passcode: string;
    passcodeLabel: string;
    secondPasscodeLabel: string;
    passcodeSubTitle: string;
    touchLabel: string;
    _firstSetPasscode: string;
    onCorrect: any;
    onWrong: any;
    selected: any;
    enteredPasscode: any;
    constructor(events: Events, navCtrl: NavController, navParams: NavParams);
    allClear(): void;
    remove(): void;
    digit(digit: any): void;
}
