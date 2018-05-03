import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GisuViewPage } from './gisu-view';

@NgModule({
  declarations: [
    GisuViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GisuViewPage),
  ],
})
export class GisuViewPageModule {}
