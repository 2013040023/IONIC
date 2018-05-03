import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNoticePage } from './detail-notice';

@NgModule({
  declarations: [
    DetailNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNoticePage),
  ],
})
export class DetailNoticePageModule {}
