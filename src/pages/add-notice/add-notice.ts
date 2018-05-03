import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController, ToastController,Platform  } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Storage } from '@ionic/storage';
import { BoardProvider } from '../../providers/board/board';
import { FileChooser } from '@ionic-native/file-chooser';

/**
 * Generated class for the AddNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-notice',
  templateUrl: 'add-notice.html',
})
export class AddNoticePage {

	//public apiUrl = 'http://192.168.0.60:8080';
	//public apiUrl = 'http://192.168.0.9:8080';
	public apiUrl = 'http://cnode.iptime.org:8200';
  	public imageURI :any;
  	
  	public PFandroid : boolean;
  	public PFios : boolean;
  	public fileURI : string;
  	public fileName : string;

  	todo = {
	    boardTitle : '',
	    boardContent : '',
	    userNo : '',
	    boardType : '',
  	}

  constructor(  public navCtrl: NavController,
  				public navParams: NavParams,
  				private fileTransfer: FileTransfer,
				private camera: Camera,
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController,
				public filepath: FilePath,
				public boardProvider: BoardProvider,
				private storage: Storage,
				private platform: Platform,
				private alertCtrl: AlertController,
				public fileChooser: FileChooser
  				) {
  			this.todo.boardType = navParams.get('boardType');
  }

  ionViewDidLoad() {
  	this.fileURI = '';
    //console.log('ionViewDidLoad AddNoticePage');
    this.storage.get('user_no').then((val) => {
  		this.todo.userNo = val+"";
  	});

  	this.imageURI = [];
  	if (this.platform.is('ios')) {
	        this.PFios = true;
	        this.PFandroid = false;
	    }
	    else if(this.platform.is('android')) {
	        this.PFandroid = true;
	        this.PFios = false;
	    }

  }


    takePhoto() {
    	
    const options : CameraOptions = {
        quality: 100, // picture quality
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.CAMERA,
        targetWidth: 600,
		targetHeight: 600,
        saveToPhotoAlbum : false,
        correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
        
        if(this.imageURI.length>2){
        	let alert = this.alertCtrl.create({
                title: '',
                subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                buttons: ['확인']
            });
            alert.present();
        }else{
        	let alert = this.alertCtrl.create({
                title: '',
                subTitle: imageData+"올립니다.",
                buttons: ['확인']
            });
            alert.present();
        	this.imageURI.push(imageData);
        }
        

	    }, (err) => {
	    console.log(err);
	    });
  	}

  	deletePhoto(index){
	   this.imageURI.splice(index,1);
	}

    getImage() {

    let loader = this.loadingCtrl.create({
	    	content: "Uploading..."
	    });
	    loader.present();

    const options: CameraOptions = {
    	quality: 100, // picture quality
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
	    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
	    targetWidth: 600,
		targetHeight: 600,
		correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {

    	if(this.imageURI.length>2){
        	let alert = this.alertCtrl.create({
                title: '',
                subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                buttons: ['확인']
            });
            alert.present();
            loader.dismiss();
        }else{
        	this.imageURI.push(imageData);
        	loader.dismiss();	
        }
	}, (err) => {
			loader.dismiss();
		    console.log(err);
		    this.presentToast(err);
	});
	}

	upFile(){

		this.fileChooser.open().then(
			uri=> {
				//console.log(uri);
				this.filepath.resolveNativePath(uri).then((fileentry) => {
			        this.fileURI = fileentry;
			        this.fileName = fileentry.replace(/^.*[\\\/]/, '');
			    });
			}
		);

	}

  	uploadFile() {

  		if(this.todo.boardTitle =="" || this.todo.boardContent=="" ){
  			let alert = this.alertCtrl.create({
		        subTitle: '제목과 내용은 반드시 입력되어야 합니다.',
		        buttons: ['확인']
		    });
		    alert.present();

  			}else{

  			//this.todo.boardType = "NT"
		    let loader = this.loadingCtrl.create({
		    	content: "Uploading..."
		    });
		    loader.present();
	 
		    this.boardProvider.uploadBoard(this.todo).then(
		        data => {
		        	//console.log("pass");
		        	this.uploadImage(data["boardId"],loader);
		        	this.uploadFileFile(data["boardId"],loader);
		        },
		        err => {
		            console.log(err);
		            loader.dismiss();
		        });
  			}
	}

	presentToast(text) {
    let toast = this.toastCtrl.create({
		    message: text,
		    duration: 3000
	    });
	    toast.present();
  	}

  	myFunction() {
  		this.uploadFile();
  	}

  	uploadImage(boardId,loader){

  		if(this.imageURI.length == 0){
			return;
  		}
  		else{
  			for(var i =0;i<this.imageURI.length;i++){	    		
		    	var options = {
				    fileKey: "file",
				    fileName: (i+1)+"",
				    chunkedMode: false,
				    mimeType: "multipart/form-data",
				    params: {
			    		 	"userNo" : this.todo.userNo,
			    		  	"boardType" : this.todo.boardType,
			    		  	"boardId" : boardId+""
						}
				};
				
				const Transfer: FileTransferObject = this.fileTransfer.create();

			  	Transfer.upload(this.imageURI[i], this.apiUrl+'/board/uploadImage', options)
				    .then((data) => {
					}, (err) => {
					});
		    }
		}
  	}

  	uploadFileFile(boardId,loader){

  		if(this.fileURI != ''){

  			var options = {
				    fileKey: "file",
				    fileName: this.fileName,
				    //chunkedMode: false,
				    mimeType: "multipart/form-data",
				    params: { 
				    		  "userNo" : this.todo.userNo,
				    		  "boardType" : this.todo.boardType,
				    		  "boardId" : boardId+""
						}
				};

				const Transfer: FileTransferObject = this.fileTransfer.create();
			  	Transfer.upload(this.fileURI, this.apiUrl+'/board/uploadfile', options)
				    .then((data) => {
			    	this.presentToast("upload success");
					loader.dismiss();
	   				this.navCtrl.pop();
				    
				}, (err) => {
				    //console.log(err);
				    this.presentToast("file upload fail");
					loader.dismiss();
	   				this.navCtrl.pop();
				});

  		}else{
  			this.presentToast("upload success");
  			loader.dismiss();
	   		this.navCtrl.pop();
  		}

  	}

  	deleteFile(){
  		this.fileURI = '';
  		this.fileName = '';
  	}

}
