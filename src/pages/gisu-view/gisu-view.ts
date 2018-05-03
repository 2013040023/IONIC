import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MainPage } from '../main/main';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the GisuViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gisu-view',
  templateUrl: 'gisu-view.html',
})
export class GisuViewPage {

      constructor(public navCtrl: NavController, 
                  public navParams: NavParams,
                  public userProvider: UserProvider,
                  public callNumber: CallNumber,
                  private storage: Storage,
                  public toastCtrl: ToastController       
        ) {
  		this.user.ceoNo = navParams.get('ceo_no');
  		this.user.code_nm = navParams.get('code_nm');
  	}

  	user = {
        ceoNo : '',
        ceoImg : '',
        ceoOrder : '',
        userName : '',
        phoneNum : '',
        ceoEmail : '',
        ceoCpn : '',
        ceoCtg : '',
        ceoSpot : '',
        ceoCpnNo : '',
        ceoFaxNo : '',
        ceoRtAddr : '',
        code_nm : '',
        comment :'',
        userNo : ''
    }

    checkFirstMemo : boolean;
  ionViewDidLoad() {
    //console.log('ionViewDidLoad GisuViewPage');
    var topCommentDom = document.getElementById("comment").offsetTop;
    // var ihHeader = (Number)(document.getElementById("ihHeader").style.height);
    var ihHeader= 60;
    console.log(topCommentDom);
    console.log(ihHeader);

    document.getElementById("comment").style.height = (window.innerHeight - topCommentDom- ihHeader - 7)+"px";


        this.userProvider.userSelect(this.user).then(
	        data => {
                //console.log(data);
                if(data[0].CEO_IMG == undefined){
                     this.user.ceoImg = "assets/imgs/nonImg.png"
                }else{
                     this.user.ceoImg = data[0].CEO_IMG;
                }
	        	this.user.ceoOrder = "(" + data[0].CEO_ORDER.substr(2,4)+"기)";

                if(data[0].CEO_HDP_NO01 != undefined){
                    this.user.phoneNum = this.chInputNumber(data[0].CEO_HDP_NO01);
                }
                
                //console.log(data);
                this.user.userName = data[0].CEO_NM;
                this.user.ceoEmail = data[0].CEO_EMIL;
                this.user.ceoCpn = data[0].CEO_CPN;
                this.user.ceoCtg = data[0].CEO_CTG;
                this.user.ceoSpot = data[0].CEO_SPOT;
                this.user.ceoNo = data[0].CEO_NO;

               
                this.storage.get('user_no').then((val) => {
                    
                    this.startMemoSelect(data[0].CEO_NO,val);
                
                });


                if(data[0].CEO_CPN_NO01 != undefined){
                    this.user.ceoCpnNo = this.chInputNumber(data[0].CEO_CPN_NO01);
                }

                if(data[0].CEO_FAX_NO01 != undefined){
                    this.user.ceoFaxNo = this.chInputNumber(data[0].CEO_FAX_NO01);
                }
                this.user.ceoRtAddr = data[0].CEO_RT_ADDR;
	        },
	        err => {
	            console.log(err);
        });



    }
    clickMain(){
        
        this.navCtrl.setRoot(MainPage);
    }
    
    phoneCall(phoneNum:string){
        this.callNumber.callNumber(phoneNum, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
            }


    chInputNumber(data : string){
        if(data.substr(0, 2)=="02"){
            if(data.length==9){
                data = data.substr(0,2) + "-" +data.substr(2,3)+ "-" + data.substr(5,4);
            }
            else{
                data = data.substr(0,2) + "-" +data.substr(2,4)+ "-" + data.substr(6,4);
            }
        }else{
            if(data.substr(0, 1)=="0"){
                if(data.length==10){
                    data = data.substr(0,3) + "-" +data.substr(3,3)+ "-" + data.substr(6,4);
                }
                else{
                    data = data.substr(0,3) + "-" +data.substr(3,4)+ "-" + data.substr(7,4);
                }
            }else{

                data = data;
            }
        }
        return data;
    }

    saveComment(){

        this.storage.get('user_no').then((val) => {
            console.log(val);

            this.user.userNo = val;

            if(this.checkFirstMemo){
                this.userProvider.updateComment(this.user).then(
                    data => {
                        let toast = this.toastCtrl.create({
                            message: '저장되었습니다.',
                            duration: 2000
                          });
                          toast.present();
                    },
                    err => {
                        console.log(err);
                });

            }else{
                this.userProvider.insertComment(this.user).then(
                    data => {
                        let toast = this.toastCtrl.create({
                            message: '저장되었습니다.',
                            duration: 2000
                          });
                          toast.present();
                          //처음 저장시 연속저장 체크
                          this.checkFirstMemo = true;
                    },
                    err => {
                        console.log(err);
                });

            }
        });
    }

    startMemoSelect(ceoNo : string,userNo : string){
        
        this.user.userNo = userNo;
        
        this.userProvider.memoSelect(this.user).then(
	        data => {
               console.log(data);

               if(data["result"]!="empty"){

                    this.user.comment = data["result"];
                    this.checkFirstMemo = true;
                }else{
                    this.checkFirstMemo = false;
               }
	        },
	        err => {
	            console.log(err);
        });

    }
}



