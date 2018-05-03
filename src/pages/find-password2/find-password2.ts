import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SMS } from "@ionic-native/sms"
import { FindPassword3Page } from '../find-password3/find-password3'
/**
 * Generated class for the FindPassword2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-password2',
  templateUrl: 'find-password2.html',
})
export class FindPassword2Page {

	todo = {
		userNo : '',
	    username : '',
	    userPhoneNumber : '',
	    userNumberCheck : '',
	    userNumberInput : '',
	    userAllow : ''
	}

	userId : string;
	
	constructor(private sms: SMS,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public restProvider: RestProvider) {
		this.userId = navParams.get('userId');
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad FindPassword2Page');
	}

	checkNumber(){
		if(this.todo.userPhoneNumber=="" || this.todo.userPhoneNumber.length!= 11){
	         let alert = this.alertCtrl.create({
	            title: '',
	            subTitle: '휴대전화 번호를 정확하게 입력해주시기 바랍니다.',
	            buttons: ['확인']
	        });
	        alert.present();
	        return;
    	}

    	this.restProvider.getPhoneFindNumber(this.todo).then(
        data => {
            var check_num = data["check_num"]; 
            //console.log(check_num);
            if(check_num == "undefined"){

                let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '해당 번호로 가입된 회원이 없습니다.',
                    buttons: ['확인']
                });
                alert.present();
                return;

            }else{

            var Message = "인증번호는 [" + check_num + "] 입니다.";

            this.todo.userNumberCheck = check_num;
            console.log(this.todo.userNumberCheck);
            //console.log(Message);

             var options: {
                      replaceLineBreaks:true,
                      android:{
                          intent:'INTENT'
                      }
                }

            this.sms.send(this.todo.userPhoneNumber, Message, options)
            .then(() => {
                let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '인증번호 입력란에 인증번호를 입력하고 인증을 해주세요.',
                    buttons: ['확인']
                });
                alert.present();
                }).catch((err) => {
	                console.log(JSON.stringify(err))
    	        });
            }
        }, 
        err => {
           console.log(err);
        });

	}

	findID1() {

        if(this.todo.userNumberCheck == this.todo.userNumberInput && this.todo.userNumberInput != '' ){

            this.todo.userAllow = "true";
            let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '인증되었습니다.',
                    buttons: ['확인']
                });
            alert.present();
            
            this.navCtrl.push(FindPassword3Page, {
		     	 userId: this.userId
		    });
        }
        else{

        	this.todo.userAllow = '';
            let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '인증번호가 틀립니다.',
                    buttons: ['확인']
                });
                alert.present();
        }
    }

}
