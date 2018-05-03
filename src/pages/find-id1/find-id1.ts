import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SMS } from "@ionic-native/sms"

import { FindId2Page } from '../find-id2/find-id2'
/**
 * Generated class for the FindId1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-id1',
  templateUrl: 'find-id1.html',
})
export class FindId1Page {

	todo = {
		userNo : '',
	    ceoNm : '',
	    userPhoneNumber : '',
	    userNumberCheck : '',
	    userNumberInput : '',
	    userAllow : ''
	}


	constructor(private sms: SMS,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public restProvider: RestProvider) {
	}

	ionViewDidLoad(){
    //console.log('ionViewDidLoad FindId1Page');
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
        	//var nickname = data["user_nickname"];
            var check_num = data["check_num"]; 
            console.log(data);
            if(check_num == "undefined"){

                let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '해당 번호로 가입된 회원이 없습니다.',
                    buttons: ['확인']
                });
                alert.present();
                return;

            }else{
            	//this.todo.nickname = nickname;
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
                return;
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
            
            this.dofunction();

            
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

    dofunction(){

        console.log(this.todo);
        //this.restProvider.get
        this.restProvider.getUserId(this.todo).then(
            data => {
                var userId = data["user_id"];
                //console.log(userId);
                this.navCtrl.push(FindId2Page, {
                      userId: userId
                });
            }, 
            err => {
               console.log(err);
            });
    }
}
