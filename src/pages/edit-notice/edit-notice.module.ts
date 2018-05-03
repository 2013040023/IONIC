import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNoticePage } from './edit-notice';

@NgModule({
  declarations: [
    EditNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(EditNoticePage),
  ],
})
export class EditNoticePageModule {}
