import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import CryptoJS from 'crypto-js';

import { RegisterPage } from '../register/register'
import { FindId1Page } from '../find-id1/find-id1'
import { FindPassword1Page } from '../find-password1/find-password1'
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    todo = {
        userId : '',
        userpassword : '',
        userpasswordHash : ''
    }

    autologin: boolean;
    constructor(public navCtrl: NavController,private storage: Storage,public restProvider: RestProvider, private alertCtrl: AlertController) {
    }
    ionViewDidLoad() {

        this.storage.get('user_no').then((val) => {
            console.log(val);
        });

        this.storage.get('autologin').then((val) => {
            if( val == "1"){
                this.navCtrl.setRoot(MainPage);
            }

        });
    }
    findID(){
      this.navCtrl.push(FindId1Page);
    }
    findPassword(){
      this.navCtrl.push(FindPassword1Page);
    }

    registUser(){
      this.navCtrl.push(RegisterPage);
    }

    login(){
        if(this.todo.userId == '' || this.todo.userpassword == '' ){

            let alert = this.alertCtrl.create({
                    title: '',
                    subTitle: '아이디와 비밀번호는 반드시 입력되어야 합니다.',
                    buttons: ['확인']
                });
                alert.present();
        }
        else{

            //console.log(this.autologin);
            let hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
            this.todo.userpasswordHash = hash;

            this.restProvider.loginUser(this.todo).then(
            data => {
                
                var checkUser = data["checkUserId"];
                //console.log(checkUser);
                if(checkUser == "true"){

                    var userNo = data["user_no"];
                    var userAuth = data["user_auth"];

                    this.storage.set('user_no', userNo);
                    this.storage.set('user_auth',userAuth);

                    if(this.autologin){
                        this.storage.set('autologin',"1");
                    }
                    else{
                        this.storage.set('autologin',"0");
                    }
                   
                   this.navCtrl.setRoot(MainPage);

                }else{

                    let alert = this.alertCtrl.create({
                        title: '',
                        subTitle: '아이디와 비밀번호를 다시 확인해주세요.',
                        buttons: ['확인']
                    });
                    alert.present();
                    this.todo.userpassword = ''
                }
            }, 
            err => {
               console.log(err);
            });
        }

    }

}
