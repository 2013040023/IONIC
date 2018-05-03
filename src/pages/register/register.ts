import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SMS } from "@ionic-native/sms"
import CryptoJS from 'crypto-js';
import { HomePage } from '../home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { RegisterPopupPage } from '../register-popup/register-popup';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  todo = {
        userId : '',
        checkId : '',
        userpassword : '',
        username : '',
        userPhoneNumber : '',
        userNumberCheck : '',
        userNumberInput : '',
        userAllow : ''
    }
    public ceoLists : any;
    detailPopup : boolean;
    constructor(private sms: SMS,
                public navCtrl: NavController, 
                public navParams: NavParams ,
                public restProvider: RestProvider, 
                private alertCtrl: AlertController,
                private androidPermissions: AndroidPermissions,
                private platform: Platform,
                public modalCtrl: ModalController
                ) {
  }
    
    ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
     if (this.platform.is('ios')) {
          return;              
    }
    else if(this.platform.is('android')) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
        );
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_PHONE_STATE, this.androidPermissions.PERMISSION.READ_PHONE_STATE]);
	    }
	}

    join() {
        this.ceoLists = [];
        if(this.todo.userId != '' && this.todo.userpassword != '' && this.todo.username != '' && this.todo.userPhoneNumber != '' && this.todo.userAllow == "true" && this.todo.checkId == "true" && this.detailPopup){
            
            this.restProvider.getCeoMember(this.todo).then(
		        data => {
                    //console.log(data);
                    if(data[0] != undefined){

                    
                        this.ceoLists.push(data[i]);
                        var order = data[i].CEO_ORDER+"기수"
                        this.ceoLists[i]["order"]=order;

                        let alert = this.alertCtrl.create();
                        alert.setTitle('리스트 확인');

                        for(var i in data){

                        alert.addInput({
                          type: 'radio',
                          label: data[i].CEO_ORDER.substr(2,4) + "기수" + "  "+data[i].CEO_NM,
                          value: data[i].CEO_NO,
                          checked: true
                        });

                        alert.addButton('Cancel');
                        alert.addButton({
                          text: 'OK',
                          handler: data => {
                              this.join_data(data);
                          }
                        });
                        alert.present();
                      
                    }

                    }else{

                        this.confirmAlert("해당 번호는 원우회원 리스트에 존재하지 않습니다.");
                        return;
                    }

                    //console.log(this.ceoLists);
		        }, 
		        err => {
		           console.log(err);
		           return;
		        });
            
        }
        else{
            if(this.todo.checkId != "true"){
                this.confirmAlert("중복확인이 되지 않았습니다.");
            }
            else if(this.todo.userAllow != "true"){
                this.confirmAlert("인증번호를 입력하지 않았습니다.");
            }
            else if(!this.detailPopup){
                this.confirmAlert("개인정보 수집 및 이용동의가 체크되지 않았습니다.");
            }
            else {
                this.confirmAlert("필수항목이 입력되지 않았습니다.");
            }

        }
    }

    confirm() {
        if(this.todo.userNumberCheck == this.todo.userNumberInput && this.todo.userNumberInput != '' ){
            this.todo.userAllow = "true";
            this.confirmAlert("인증되었습니다.");
        }
        else{
            this.confirmAlert("인증번호가 틀립니다.");
        }
    }

    checkUserId() {
        if(this.todo.userId == ""){
        	this.confirmAlert("아이디를 입력해주세요.");
        } 
        this.restProvider.checkUser(this.todo).then(
        data => {
            var checkUser = data["checkUserId"];
            //console.log(checkUser);
            if(checkUser  == "true"){
                this.todo.checkId = "true";
                this.confirmAlert("아이디 사용이 가능합니다.");
            }else{
                this.todo.checkId = '';
                this.confirmAlert("해당아이디는 사용자가 존재합니다.");
             }
        }, 
        err => {
           console.log(err);
        });
    }

    checkNumber(){
    if(this.todo.userPhoneNumber=="" ){
        this.confirmAlert("휴대전화 번호를 정확하게 입력해주시기 바랍니다.");
        return;
    }

    this.restProvider.getPhoneCheckNumber(this.todo).then(
        data => {
            var check_num = data["check_num"]; 
            //	test용도
            console.log(check_num); 
            if(check_num == "undefined"){
                this.confirmAlert("해당 번호는 가입된 회원 입니다.");
            }else{
                 var Message = "회원가입 인증번호는 [" + check_num + "] 입니다.";
                 this.todo.userNumberCheck = check_num;
                    var options: {
                        replaceLineBreaks:true,
                        android:{
                            intent:'INTENT'
                        }
                    }
                    this.sms.send(this.todo.userPhoneNumber, Message, options)
                    .then(() => {
                		this.confirmAlert("인증번호 입력란에 인증번호를 입력하고 인증을 해주세요.");
                    }).catch((err) => {
                        //console.log(JSON.stringify(err))
                    });
                return;
            }
          }, 

        err => {
           console.log(err);
        });
    
    }

    confirmAlert(message){
    	let alert = this.alertCtrl.create({
            title: '',
            subTitle: message,
            buttons: ['확인']
        });
        alert.present();

    }

    join_data(data : string){

        let hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
            this.todo.userpassword = hash;
            this.todo['ceo_no'] = data;
            //console.log(this.todo);
            this.restProvider.joinUser(this.todo).then(
                data => { 
                    console.log("success join!!");
                },
                err => {
                    console.log(err);
                });
            this.navCtrl.setRoot(HomePage);

    }

    viewDetailPopup(){
        let modal = this.modalCtrl.create(RegisterPopupPage);
        modal.present();

    }
}
