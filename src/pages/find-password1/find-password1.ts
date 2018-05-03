import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FindPassword2Page } from '../find-password2/find-password2'
/**
 * Generated class for the FindPassword1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-password1',
  templateUrl: 'find-password1.html',
})
export class FindPassword1Page {

	todo = {
	    userId : ''
  	}
  	
  	constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider, private alertCtrl: AlertController) {
  	}

  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad FindPassword1Page');
  	}

	checkID() {
		if(this.todo.userId == ""){

            let alert = this.alertCtrl.create({
            title: '',
            subTitle: '아이디를 입력해주세요',
            buttons: ['확인']
            });
            alert.present();
            return;
        } 

        this.restProvider.checkUser(this.todo).then(
        data => {
            var checkUser = data["checkUserId"];
            //console.log(checkUser);
            if(checkUser  == "true"){
                let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '해당아이디는 사용 유저가 없습니다.',
                    buttons: ['확인']
                });
                alert.present();
                return
            }

            else{
            	this.navCtrl.push(FindPassword2Page, {
		     	userId: this.todo.userId
		    });

            }
        }, 
        err => {
           console.log(err);
        });
	}

}
