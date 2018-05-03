import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FindPassword2Page } from '../find-password2/find-password2'
/**
 * Generated class for the FindId2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-id2',
  templateUrl: 'find-id2.html',
})
export class FindId2Page {

	userId : string;
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.userId = navParams.get('userId');
  	}

 	ionViewDidLoad() {
    //console.log('ionViewDidLoad FindId2Page');
    
  }
  	confirm(){

  		this.navCtrl.setRoot(HomePage);

  	}

  	findPassword(){
  		
  		this.navCtrl.push(FindPassword2Page,{
		    userId: this.userId
	    });

  	}

}
