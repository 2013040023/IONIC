import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPopupPage } from './register-popup';

@NgModule({
  declarations: [
    RegisterPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPopupPage),
  ],
})
export class RegisterPopupPageModule {}
