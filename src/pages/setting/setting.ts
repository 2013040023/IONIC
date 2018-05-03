import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
    
    //public apiUrl = 'http://192.168.0.60:8080';
    public apiUrl = 'http://cnode.iptime.org:8200';
    autologinToggle: boolean;
    todo = {
    	
	    userNo : '',
  	}

    user = {
        userNo : '',
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
        ceoOrderNm :''
     }

    constructor(	
    	public navCtrl: NavController, 
  		public navParams: NavParams,
  		private storage: Storage,
  		private alertCtrl: AlertController,
  		public userProvider: UserProvider,
        private fileTransfer: FileTransfer,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController
		) {
  }

  ionViewDidLoad() {
    
    this.storage.get('autologin').then((val) => {
		if( val == "1"){
			this.autologinToggle = true;
		}else{

			this.autologinToggle = false;
		}
	});

    this.storage.get('user_no').then((val) => {
                
            this.todo.userNo = val;
            //console.log(this.todo)
            this.userProvider.userSelect(this.todo).then(
		        data => {
                    //console.log(data);
                    if(data[0].CEO_IMG == undefined){
                         this.user.ceoImg = "assets/imgs/nonImg.png"
                    }else{
                         this.user.ceoImg = data[0].CEO_IMG;
                    }
		        	this.user.ceoOrder = data[0].CEO_ORDER;
                    this.user.phoneNum = data[0].CEO_HDP_NO01.substr(0, 3) + "-"+ data[0].CEO_HDP_NO01.substr(3, 4) + "-" + data[0].CEO_HDP_NO01.substr(7);
                    this.user.userName = data[0].CEO_NM;
                    this.user.ceoEmail = data[0].CEO_EMIL;
                    this.user.ceoCpn = data[0].CEO_CPN;
                    this.user.ceoCtg = data[0].CEO_CTG;
                    this.user.ceoSpot = data[0].CEO_SPOT;
                    this.user.ceoCpnNo = this.chInputNumber(data[0].CEO_CPN_NO01);
                    this.user.ceoFaxNo = this.chInputNumber(data[0].CEO_FAX_NO01);
                    this.user.ceoRtAddr = data[0].CEO_RT_ADDR;
                    this.gisuSelect()
		        },
		        err => {
		            console.log(err);
	        });
         });
  }

  updateAutologin(){

		if(this.autologinToggle){
			this.storage.set('autologin',"1");
		}else{
			this.storage.set('autologin',"0");
		}
    }

    deleteUser(){
    	let alert = this.alertCtrl.create({
            title: '',
            message: '정말 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                text: '삭제',
                handler: () => {
                    this.userProvider.userDelete(this.todo).then(
				        data => {
				        	this.storage.set('autologin',"0");
				        	this.navCtrl.setRoot(HomePage);
				        },
				        err => {
				            console.log(err);
			        });
                }
                }
            ]
        });
        alert.present();

    }

    clickSubmit(){
        this.updateUserInfo();
    }

    updateUserInfo(){

        this.user.userNo = this.todo.userNo;
        if(this.user.ceoEmail ==''){
            let alert = this.alertCtrl.create({
              subTitle: '이메일을 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();

            return;
        }

        if(this.user.ceoCpn == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사명을 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }

        if(this.user.ceoCtg == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사 업종을 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }

        if(this.user.ceoSpot == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사 직위를 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }

        if(this.user.ceoCpnNo == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사 전화번호를 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }else{
            this.user.ceoCpnNo = this.user.ceoCpnNo.replace(/-/gi,"");  
        }

        if(this.user.ceoFaxNo == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사 팩스번호를 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }else{
            this.user.ceoFaxNo = this.user.ceoFaxNo.replace(/-/gi,"");
        }


        if(this.user.ceoRtAddr == ''){
            let alert = this.alertCtrl.create({
              subTitle: '회사 주소를 입력해주세요.',
              buttons: ['확인']
            });
            alert.present();
            return;
        }else{
            this.userProvider.updateUserInfo(this.user).then(
            data => {
                this.navCtrl.pop();
            },
            err => {
                console.log(err);
            });

        }
    }

    actionSheet(){

        let actionSheet = this.actionSheetCtrl.create({
        buttons: [
        {
          text: '사진찍기',
            handler: () => {
            //console.log('Archive clicked');
            const options : CameraOptions = {
                quality: 90, // picture quality
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                sourceType: this.camera.PictureSourceType.CAMERA,
                targetWidth: 600,
                targetHeight: 600,
                saveToPhotoAlbum : false,
                correctOrientation: true
            }

            this.camera.getPicture(options).then((imageData) => {
                this.user.ceoImg = imageData;
                this.updatePhoto();
                    
                }, (err) => {
                console.log(err);
                });
          }
        },
        {
            text: '앨범에서 가져오기',
            handler: () => {
            const options: CameraOptions = {
                quality: 90, // picture quality
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                targetWidth: 600,
                targetHeight: 600,
                correctOrientation: true
            }

            this.camera.getPicture(options).then((imageData) => {
                this.user.ceoImg = imageData;
                this.updatePhoto();
            }, (err) => {
                console.log(err);
            });
          }
        },
        {
          text: '삭제하기',
          role: 'destructive',
          handler: () => {
            this.userProvider.userImgDelete(this.todo).then(
                data => {     
                },
                err => {
                    console.log(err);
            });
            this.user.ceoImg = 'assets/imgs/nonImg.png'
          }
        },
        {
            text: '취소',
            role: 'cancel',
            handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

    }

    updatePhoto(){

        console.log(this.todo.userNo);
        var options = {
            fileKey: "file",
            fileName: this.todo.userNo+"profile",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 
                      "userNo" : this.todo.userNo,
                },
            headers: {'Cache-Control': 'no-cache',
                      'Expires' : '-1'}
        };
        
        const Transfer: FileTransferObject = this.fileTransfer.create();
        Transfer.upload(this.user.ceoImg, this.apiUrl+'/user/uploadImage', options)
            .then((data) => {
               //console.log(data+" Uploaded Successfully");
        }, (err) => {
            //console.log(err);
        });

    }

    gisuSelect(){

        this.userProvider.selectUserGisu(this.user).then(
                data => {
                    this.user.ceoOrderNm = data["code_nm"];
                },
                err => {
                    console.log(err);
            });
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
}
