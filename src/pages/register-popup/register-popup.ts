import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the RegisterPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-popup',
  templateUrl: 'register-popup.html',
})
export class RegisterPopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    
  }


  closeModal(){

    this.viewCtrl.dismiss();
  }




}
