import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register'
import { MainPage } from '../pages/main/main'
import { FindId1Page } from '../pages/find-id1/find-id1'
import { FindId2Page } from '../pages/find-id2/find-id2'
import { FindPassword1Page } from '../pages/find-password1/find-password1'
import { FindPassword2Page } from '../pages/find-password2/find-password2'
import { FindPassword3Page } from '../pages/find-password3/find-password3'
import { NoticePage } from '../pages/notice/notice'
import { AddNoticePage } from '../pages/add-notice/add-notice'
import { SettingPage } from '../pages/setting/setting'
import { DetailNoticePage } from '../pages/detail-notice/detail-notice'
import { EditNoticePage } from '../pages/edit-notice/edit-notice'
import { Circle1Page } from '../pages/circle1/circle1'
import { GisuFindPage } from '../pages/gisu-find/gisu-find'
import { GisuSelectPage } from '../pages/gisu-select/gisu-select'
import { GisuViewPage  } from '../pages/gisu-view/gisu-view'
import { CircleSearchPage } from '../pages/circle-search/circle-search'
import { HospitalInfoPage } from '../pages/hospital-info/hospital-info'
import { Popover1Component } from '../components/popover1/popover1'
import { Popover2Component } from '../components/popover2/popover2'
import { Popup1Page } from '../pages/popup1/popup1'
import { NewsPage } from '../pages/news/news'
import { RegisterPopupPage } from '../pages/register-popup/register-popup'

import { SMS } from "@ionic-native/sms"
import { RestProvider } from '../providers/rest/rest';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BoardProvider } from '../providers/board/board';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { UserProvider } from '../providers/user/user';
import { GroupProvider } from '../providers/group/group';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MainPage,
    FindId1Page,
    FindId2Page,
    FindPassword1Page,
    FindPassword2Page,
    FindPassword3Page,
    NoticePage,
    AddNoticePage,
    SettingPage,
    DetailNoticePage,
    EditNoticePage,
    Circle1Page,
    GisuFindPage,
    GisuSelectPage,
    GisuViewPage,
    CircleSearchPage,
    HospitalInfoPage,
    Popover1Component,
    Popover2Component,
    Popup1Page,
    NewsPage,
    RegisterPopupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    MainPage,
    FindId1Page,
    FindId2Page,
    FindPassword1Page,
    FindPassword2Page,
    FindPassword3Page,
    NoticePage,
    AddNoticePage,
    SettingPage,
    DetailNoticePage,
    EditNoticePage,
    Circle1Page,
    GisuFindPage,
    GisuSelectPage,
    GisuViewPage,
    CircleSearchPage,
    HospitalInfoPage,
    Popover1Component,
    Popover2Component,
    Popup1Page,
    NewsPage,
    RegisterPopupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SMS,
    RestProvider,
    FileTransfer,
    File,
    Camera,
    FilePath,
    RestProvider,
    BoardProvider,
    AndroidPermissions,
    UserProvider,
    FileChooser,
    GroupProvider,
    CallNumber,
    InAppBrowser
  ]
})
export class AppModule {}
