import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalInfoPage } from './hospital-info';

@NgModule({
  declarations: [
    HospitalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalInfoPage),
  ],
})
export class HospitalInfoPageModule {}
