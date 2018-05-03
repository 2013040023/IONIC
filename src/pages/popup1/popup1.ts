import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';
import { UserProvider } from '../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the Popup1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup1',
  templateUrl: 'popup1.html',
})
export class Popup1Page {

    //public apiUrl = 'http://192.168.0.60:8080';
    public apiUrl = 'http://cnode.iptime.org:8200';

	groupModel = {
		groupName : '',
        GroupNo: '',
        groupMemberName : '',
        groupMemberPhone : '',
        groupMemberEmail : '',
        groupMemberSpot : '',
        buttonText : '',
        buttonCode : '',
        hsptGroupMemberNo : '',
        groupMemberImg : ''
	}

    buttonData = {
        status : ''
    }

  	constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public groupProvider : GroupProvider,
        public alertCtrl: AlertController,
        private fileTransfer: FileTransfer,
        public userProvider: UserProvider,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController) {	
  		this.groupModel.GroupNo = navParams.get('hsptGroupNo');
  		this.groupModel.groupName = navParams.get('hsptGroupNm');
  		this.groupModel.buttonText = navParams.get('buttonText');
  		this.groupModel.buttonCode = navParams.get('buttonCode');
  		this.groupModel.hsptGroupMemberNo = navParams.get('hsptGroupMemberNo');
  		this.groupModel.groupMemberName = navParams.get('groupMemberName');
  		this.groupModel.groupMemberSpot = navParams.get('groupMemberSpot');
  		this.groupModel.groupMemberPhone = navParams.get('groupMemberPhone');
  		this.groupModel.groupMemberEmail = navParams.get('groupMemberEmail');
        this.groupModel.groupMemberImg = navParams.get('groupMemberImg');

        if(this.groupModel.groupMemberImg == undefined){
            this.groupModel.groupMemberImg = "assets/imgs/nonImg.png"
        }
  	}

  ionViewDidLoad() {
  	console.log(this.groupModel);
    //console.log('ionViewDidLoad Popup1Page');
    var popup = document.getElementById("layer");
    var popHeight = popup.offsetHeight;
    var adHeight = (window.innerHeight/2 - popHeight/2)+"px";
    popup.style.marginTop = adHeight;
        
  }

  popupClose(){
    this.buttonData.status = "cancel"
  	this.viewCtrl.dismiss(this.buttonData);
  }

  addGroupMember(){
        console.log(this.groupModel);
        if( this.groupModel.groupMemberName == undefined || 
            this.groupModel.groupMemberSpot == undefined || 
            this.groupModel.groupMemberName == '' || 
            this.groupModel.groupMemberSpot == ''
            ){
            
            let alert = this.alertCtrl.create({
            subTitle: '이름과 소속은 반드시 채워야 합니다.',
            buttons: ['확인']
            });
            alert.present();   
        }
        else{

            if(this.groupModel.groupMemberPhone != undefined){

                if(this.groupModel.groupMemberPhone != ""){
                    //console.log(this.groupModel.groupMemberPhone);
                    this.groupModel.groupMemberPhone = this.groupModel.groupMemberPhone.replace(/-/gi,"");
                    if(this.groupModel.groupMemberPhone.length < 9 ){
                        let alert = this.alertCtrl.create({
                            subTitle: '폰번호는 9자리이상이여야 합니다.',
                            buttons: ['확인']
                            });
                            alert.present();
                            return;
                    }
                }
                
            }


            this.groupProvider.groupMemberAdd(this.groupModel).then(
            data => {
                    this.buttonData.status = "change"
                    this.viewCtrl.dismiss(this.buttonData);
                },
            err => {
                console.log(err);
                this.buttonData.status = "cancel"
                this.viewCtrl.dismiss(this.buttonData);
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
                this.groupModel.groupMemberImg = imageData;
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
                this.groupModel.groupMemberImg = imageData;
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
            this.userProvider.userImgDelete(this.groupModel).then(
                data => {
                    
                },
                err => {
                    console.log(err);
            });
            this.groupModel.groupMemberImg = 'assets/imgs/nonImg.png';
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

        //console.log(this.todo.userNo);
        var options = {
            fileKey: "file",
            fileName: "hospitalProfile",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 
                      "userNo" : this.groupModel.hsptGroupMemberNo,
                },
            headers: {'Cache-Control': 'no-cache',
                      'Expires' : '-1'}
        };
        
        const Transfer: FileTransferObject = this.fileTransfer.create();
        Transfer.upload(this.groupModel.groupMemberImg, this.apiUrl+'/user/uploadImage', options)
            .then((data) => {
               //console.log(data+" Uploaded Successfully");
        }, (err) => {
            //console.log(err);
        });

    }

}
