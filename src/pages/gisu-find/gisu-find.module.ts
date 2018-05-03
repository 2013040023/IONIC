import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GisuFindPage } from './gisu-find';

@NgModule({
  declarations: [
    GisuFindPage,
  ],
  imports: [
    IonicPageModule.forChild(GisuFindPage),
  ],
})
export class GisuFindPageModule {}
