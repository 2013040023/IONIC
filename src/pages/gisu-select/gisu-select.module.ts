import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GisuSelectPage } from './gisu-select';

@NgModule({
  declarations: [
    GisuSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(GisuSelectPage),
  ],
})
export class GisuSelectPageModule {}
