import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import CryptoJS from 'crypto-js';
import { HomePage } from '../home/home';

/**
 * Generated class for the FindPassword3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-password3',
  templateUrl: 'find-password3.html',
})
export class FindPassword3Page {

  	todo = {
	    userId : '',
	    userpassword : '',
	    userpassword2 : '',
	    userpasswordHash : ''
  	}

	userId : string;
	constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider, private alertCtrl: AlertController) {

		this.userId = navParams.get('userId');
}

	ionViewDidLoad() {
    //console.log('ionViewDidLoad FindPassword3Page');
	}

	changePassword() {
		if(this.todo.userpassword != this.todo.userpassword2){
	         let alert = this.alertCtrl.create({
	            title: '',
	            subTitle: '비밀번호가 서로 맞지 않습니다.',
	            buttons: ['확인']
	        });
	        alert.present();
	        return;
    	}
    	else{

    		this.todo.userId = this.userId;
    		let hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
            this.todo.userpasswordHash = hash;
            console.log(this.todo);
    		this.restProvider.chagePassword(this.todo).then(
                data => { },
                err => {
                    console.log(err);
                });
    		
    		this.navCtrl.setRoot(HomePage);


    	}


	}
}
