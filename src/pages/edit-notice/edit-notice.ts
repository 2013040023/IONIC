import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,AlertController,Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { BoardProvider } from '../../providers/board/board';
import { FileChooser } from '@ionic-native/file-chooser';

/**
 * Generated class for the EditNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-notice',
  templateUrl: 'edit-notice.html',
})
export class EditNoticePage {

	//public apiUrl = 'http://192.168.0.60:8080';
	//public apiUrl = 'http://192.168.0.9:8080';
	public apiUrl = 'http://cnode.iptime.org:8200';
	public imageURI = new Array;
	public photos : any;
  	public count = 0;
  	public fileURI : string;
  	public fileName : string;
  	public PFandroid : boolean;
  	public PFios : boolean;

  	todo = {
	    boardTitle : '',
	    boardContent : '',
	    userNo : '',
	    boardType : '',
	    boardId : '',
	    fileName : '',
	    imgCount : ''
  	}
	constructor(
			public navCtrl: NavController,
			public navParams: NavParams,
			private fileTransfer: FileTransfer,
			private camera: Camera,
			public loadingCtrl: LoadingController,
			public toastCtrl: ToastController,
			public filepath: FilePath,
			public boardProvider: BoardProvider,
			private alertCtrl: AlertController,
			private platform: Platform,
			public fileChooser: FileChooser
			//private storage: Storage
		) {
			this.todo.boardId = navParams.get('boardId');
	        this.todo.userNo  = navParams.get('userNo');
	}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditNoticePage');
    this.photos = [];
    this.boardProvider.viewBoard(this.todo).then(
        data => {
        	this.todo.userNo = data[0].user_no;
            this.todo.boardTitle = data[0].board_title;
            this.todo.boardContent = data[0].board_content;
            this.todo.fileName = "";
            this.todo.imgCount = "";

            if(data[0].board_img1 != undefined){
                this.photos.push(data[0].board_img1);
                //console.log(data[0].board_img1.replace(/^.*[\\\/]/, ''));
            }

            if(data[0].board_img2 != undefined){
                this.photos.push(data[0].board_img2);
            }

            if(data[0].board_img3 != undefined){
                this.photos.push(data[0].board_img3);
            }
            
            var file = data[0].board_file;
                //console.log(file);
                if(file != undefined){                    
                	if(file=="첨부파일없음"){
                		this.fileName = "";
                		this.fileURI = "";
                	}else{
                		this.fileURI = file;
                   		this.fileName = file.replace(/^.*[\\\/]/, '');
                	}
                    
                }else{
                	this.fileURI ='';
                	this.fileName = '';
                }
        },
        err => {
            console.log(err);
        });

    	if (this.platform.is('ios')) {
	        this.PFios = true;
	        this.PFandroid = false;
	    }
	    else if(this.platform.is('android')) {
	        this.PFandroid = true;
	        this.PFios = false;
	    }
  	}

   	deletePhoto(index){

	   this.photos.splice(index, 1);
	   //this.imageURI.splice(index,1);
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
        
    		if(this.photos.length>2){
        	let alert = this.alertCtrl.create({
                title: '',
                subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                buttons: ['확인']
            });
            alert.present();
            
	        }else{
	        	this.photos.push(imageData);	
	        }
	    }, (err) => {
	    console.log(err);
	    });
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

    	if(this.photos.length>2){
        	let alert = this.alertCtrl.create({
                title: '',
                subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                buttons: ['확인']
            });
            alert.present();
            loader.dismiss();
        }else{
        	this.photos.push(imageData);
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

  	uploadFile() {

	    let loader = this.loadingCtrl.create({
	    	content: "Uploading..."
	    });
	    loader.present();
	    this.boardProvider.uploadBoard(this.todo).then(
            data => {
            	//console.log("pass");
            	//loader.dismiss();
				this.uploadImage(data["boardId"],loader);
				this.uploadFileFile(data["boardId"],loader);
            },
            err => {
                console.log(err);
                //loader.dismiss();
            });

	}

	uploadImage(boardId,loader){

  		if(this.photos.length == 0){
			return;
  		}
  		else{
  			for(var i=0 ; i<this.photos.length;i++){
				
	    		var type = this.photos[i].substr(0,4);

  				if(type == "http"){
  				this.todo.fileName = this.photos[i].replace(/^.*[\\\/]/, '');
  				this.todo.imgCount = (i+1)+"";
  				this.todo.boardId  = boardId;
				this.boardProvider.uploadBoard(this.todo).then(
	                data => {
	                },
	                err => {
	                	//console.log(err)
	                });
  				}


  				else if(type == "file"){

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

				  	Transfer.upload(this.photos[i], this.apiUrl+'/board/uploadImage', options)
					    .then((data) => {
					   						    
					}, (err) => {
					
					});
  				}
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
  			loader.dismiss();
	   		this.navCtrl.pop();
  		}

  	}


  	deleteFile(){
  		this.fileURI = '';
  		this.fileName = '';
  	}

}
