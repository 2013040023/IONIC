import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController,LoadingController,PopoverController,ToastController } from 'ionic-angular';
import { BoardProvider } from '../../providers/board/board';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { EditNoticePage } from '../edit-notice/edit-notice'
import { Popover2Component } from '../../components/popover2/popover2'
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the DetailNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-notice',
  templateUrl: 'detail-notice.html',
})
export class DetailNoticePage {

	todo = {
        regiNo : '',
        userNo : '',
        boardId : '',
        boardType : '',
        boardTitle : ''
    }

    comment = {

        boardId : '',
        replyContent :'',
        userNo : '',
        replyId : '',
        regiDate : ''
    }

    photos = [];
    storageDirectory: string = '';
    items : any;
    userAuth : boolean;
    commentAuth : boolean;
    replys = [];
    fileName : string;
    fileURI : string;
    replysAuth : boolean[]; 


 	constructor(public navCtrl: NavController,
 				public navParams: NavParams,
 				public boardProvider: BoardProvider,
 				private storage: Storage,
				private fileTransfer: FileTransfer,
				private file: File,
				private platform: Platform,
				private alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public popoverCtrl: PopoverController,
                public toastCtrl: ToastController,
                private iab: InAppBrowser
 				) {
  		this.todo.boardId = navParams.get('boardId');
        this.todo.regiNo  = navParams.get('userNo');

  		if (this.platform.is('ios')) {
	        this.storageDirectory = file.documentsDirectory;
	    }
	    else if(this.platform.is('android')) {
	        this.storageDirectory = file.externalRootDirectory;
	    }
	    else {
	        // exit otherwise, but you could add further types here e.g. Windows
	        return;
	    }
  	}

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(Popover2Component);
            popover.present({
            ev: myEvent
        });
            popover.onDidDismiss(data => {
                //console.log(data);
                if(data == "edit"){
                    this.editBoard();
                }
                else if(data == "del"){
                    this.delBoard();
                }else{
                    return;
                }
            })
    }

    ionViewWillEnter(){

        // photo initialize when pop navCrtl
        this.photos = [];
        this.storage.get('user_no').then((val) => {
                //console.log(val)
                this.todo.userNo = val;

                //console.log(this.todo);
                if(this.todo.regiNo == this.todo.userNo){
                    this.userAuth = true;
                }else{
                    this.userAuth = false;
                }
                this.viewReply();
                // commentAuth 추가
         });
        
        this.boardProvider.viewBoard(this.todo).then(
            data => {
                //console.log(data);
                this.items = data;
                this.todo.boardId = this.items[0].board_id;
                this.todo.userNo = this.items[0].user_no;

                if(this.items[0].board_img1 != undefined){
                    this.photos.push(this.items[0].board_img1);
                }

                if(this.items[0].board_img2 != undefined){
                    this.photos.push(this.items[0].board_img2);
                }

                if(this.items[0].board_img3 != undefined){
                    this.photos.push(this.items[0].board_img3);
                }
                var file = this.items[0].board_file;
                if(file != undefined || file != null){
                    this.fileURI = file;
                    //console.log(this.fileURI);
                    this.fileName = file.replace(/^.*[\\\/]/, '');
                    console.log(this.fileName);
                }
                
            },
            err => {
                console.log(err);
            });
        
    }

  	ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailNoticePage');
    	
  	}

  	downloadImg(image : string){
  		//console.log(image);
        const browser = this.iab.create(image);
        // let alert = this.alertCtrl.create({
        //     title: '',
        //     message: '이미지를 다운받으시겠습니까? : '+this.storageDirectory,
        //     buttons: [
        //         {
        //             text: '취소',
        //             role: 'cancel',
        //             handler: () => {
        //             }
        //         },
        //         {
        //         text: '다운',
        //         handler: () => {
        //             var fileName = image.substr(image.length-8,8);
        //             var trustHosts = true;
        //             const browser = this.iab.create(image);

        //             const fileTransfer: FileTransferObject = this.fileTransfer.create();
        //                 fileTransfer.download(image, this.storageDirectory + fileName,trustHosts).then((entry) => {    
        //                 let toast = this.toastCtrl.create({
        //                     message: '다운로드 완료',
        //                     duration: 2000
        //                 });
        //                 toast.present();    
        //             }, (error) => {
        //                 let toast = this.toastCtrl.create({
        //                     message: error,
        //                     duration: 2000
        //                 });
        //                 toast.present();   
        //             });
        //         }
        //         }
        //     ]
        // });
        // alert.present();
  	}
    editBoard(){
        this.navCtrl.push(EditNoticePage, {
            boardId: this.todo.boardId,
            userNo: this.todo.userNo
        });
    }
    delBoard(){
        this.todo.boardId = this.todo.boardId;
        this.todo.boardType = "NT";

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
                    this.boardProvider.delBoard(this.todo).then(
                        data => {
                            //console.log(data);
                            this.navCtrl.pop();
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

    downloadFile(){
 
        if(this.fileURI == "첨부파일없음" ){
            return;

        }else
        {

        let alert = this.alertCtrl.create({
            title: '',
            message: '파일을 다운받으시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                text: '다운',
                handler: () => {

                    let loader = this.loadingCtrl.create({
                        content: "Uploading..."
                    });
                    loader.present();

                    var trustHosts = true
                    const fileTransfer: FileTransferObject = this.fileTransfer.create();
                        fileTransfer.download(this.fileURI, this.storageDirectory + this.fileName,trustHosts).then((entry) => {
                        loader.dismiss();
                    }, (error) => {
                        console.log(error);
                        loader.dismiss();
                    });
                }
                }
            ]
        });
        alert.present();

        }
    }

    leaveComment(){

        this.comment.boardId = this.todo.boardId;
        this.comment.userNo = this.todo.userNo;

        console.log(this.comment);

        this.boardProvider.leaveComment(this.comment).then(
            data => {
                this.viewReply();
                this.comment.replyContent = '';
            },
            err => {
                console.log(err);
            });
    }

    viewReply(){

        this.replys = [];
        this.comment.boardId = this.todo.boardId;
        this.boardProvider.viewReply(this.comment).then(
            data => {
                //console.log(data);
                for( var i in data){
                    this.replys.push( data[i]);

                        if(data[i].user_no == this.todo.userNo){
                            this.replys[i]["replyAuth"] = true;
                        }else{
                            //this.replys[i].set("replyAuth",false);
                            this.replys[i]["replyAuth"] = false;
                        }   
                }
                //console.log(this.replys);
            },
            err => {
                console.log(err);
            });

    }

    deleteComment(replyId : Number){

        let alert = this.alertCtrl.create({
            title: '',
            message: '해당 댓글을 정말로 삭제하시겠습니까?',
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
                    this.comment.replyId = replyId+"";
                    this.boardProvider.deleteComment(this.comment).then(
                        data => {
                            this.viewReply();
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
  	
}
