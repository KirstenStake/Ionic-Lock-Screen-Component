# Ionic Lock Screen Component

This is a simple lock screen component with numbers for your Ionic 2+ app.

The module is based on the work of [Carson Chen and the ionic2-lock-screen](https://github.com/CarsonChen1129/ionic2-lock-screen).

## Additional custom logic added to original plugin

1. subTitle row
2. additional function link row underneath number pad if required
3. Ability to set initial pin with same component (set/confirm)
4. entered code into component needs to be a md5 hash, input code gets converted to md5 hash before comparison

## Using this module in an Ionic app

```typescript
// Import the module and component
import { LockScreenModule, LockScreenComponent } from 'ionic-simple-lockscreen-md5';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    LockScreenModule // Put the module here
  ],
  entryComponents: [
    LockScreenComponent, // And add the component here
  ],
  providers: []
})
export class AppModule {}
```

Once you have imported the module, you can use it inside your pages like this (below example shows all available options at once):

```typescript
import { LockScreenComponent } from 'ionic-simple-lockscreen';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openLockscreen() {
    this.navCtrl.push(LockScreenComponent,{
      code:'X12121XXXhhwqwqw12',
      ACDelbuttons:false,
      setPasscode: true,
      passcodeLabel:'Please Enter Passcode',
      secondPasscodeLabel:'Confirm Passcode',
      passcodeSubTitle:'Must be a 4-digit code',
      additionalLinkTitle:'Forgot passcode?',
      onCorrect:function(pin){
        console.log('Input correct! Your new hashed pin is' + pin);
      },
      onWrong:function(attemptNumber){
        console.log(attemptNumber + ' wrong passcode attempt(s)');
      },
      onAdditionalLink:function(){
        console.log('anchor link clicked');
      }
    });
  }
}

```


Input definitions:

| code                    | meaning                                     | type          |       
| ----------------------- | ------------------------------------------- | ------------- |
| **code**                | current saved passcode - must be md5 hash   | string        |
| **ACDelbuttons**        | display del and ac buttons in keypad        | boolean       |
| **passcodeLabel**       | title                                       | string        |
| **passcodeSubTitle**    | sub title                                   | string        |
| **additionalLinkTitle** | title for anchor link below keypad          | string        |
| **secondPasscodeLabel** | string for title on second input in set mode| string        |
| **onWrong**             | logic if passcode is incorrect              | function      |
| **onCorrect**           | logic if passcode is correct                | function      |
| **onAdditionalLink**    | logic for additional anchor link            | function      |
| **setPasscode**         | if set true - implement set code journey    | boolean       |
