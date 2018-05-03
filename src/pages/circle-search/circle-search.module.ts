import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CircleSearchPage } from './circle-search';

@NgModule({
  declarations: [
    CircleSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CircleSearchPage),
  ],
})
export class CircleSearchPageModule {}
