var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, PopoverController, ToastController } from 'ionic-angular';
import { BoardProvider } from '../../providers/board/board';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { EditNoticePage } from '../edit-notice/edit-notice';
import { Popover2Component } from '../../components/popover2/popover2';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the DetailNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailNoticePage = /** @class */ (function () {
    function DetailNoticePage(navCtrl, navParams, boardProvider, storage, fileTransfer, file, platform, alertCtrl, loadingCtrl, popoverCtrl, toastCtrl, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.boardProvider = boardProvider;
        this.storage = storage;
        this.fileTransfer = fileTransfer;
        this.file = file;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.iab = iab;
        this.todo = {
            regiNo: '',
            userNo: '',
            boardId: '',
            boardType: 'NT',
            boardTitle: ''
        };
        this.comment = {
            boardId: '',
            replyContent: '',
            userNo: '',
            replyId: '',
            regiDate: ''
        };
        this.photos = [];
        this.storageDirectory = '';
        this.replys = [];
        this.todo.boardId = navParams.get('boardId');
        this.todo.regiNo = navParams.get('userNo');
        if (this.platform.is('ios')) {
            this.storageDirectory = file.documentsDirectory;
        }
        else if (this.platform.is('android')) {
            this.storageDirectory = file.externalRootDirectory;
        }
        else {
            // exit otherwise, but you could add further types here e.g. Windows
            return;
        }
    }
    DetailNoticePage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(Popover2Component);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (data) {
            //console.log(data);
            if (data == "edit") {
                _this.editBoard();
            }
            else if (data == "del") {
                _this.delBoard();
            }
            else {
                return;
            }
        });
    };
    DetailNoticePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // photo initialize when pop navCrtl
        this.photos = [];
        this.storage.get('user_no').then(function (val) {
            //console.log(val)
            _this.todo.userNo = val;
            //console.log(this.todo);
            if (_this.todo.regiNo == _this.todo.userNo) {
                _this.userAuth = true;
            }
            else {
                _this.userAuth = false;
            }
            _this.viewReply();
            // commentAuth 추가
        });
        this.boardProvider.viewBoard(this.todo).then(function (data) {
            //console.log(data);
            _this.items = data;
            _this.todo.boardId = _this.items[0].board_id;
            _this.todo.userNo = _this.items[0].user_no;
            if (_this.items[0].board_img1 != undefined) {
                _this.photos.push(_this.items[0].board_img1);
            }
            if (_this.items[0].board_img2 != undefined) {
                _this.photos.push(_this.items[0].board_img2);
            }
            if (_this.items[0].board_img3 != undefined) {
                _this.photos.push(_this.items[0].board_img3);
            }
            var file = _this.items[0].board_file;
            if (file != undefined || file != null) {
                _this.fileURI = file;
                //console.log(this.fileURI);
                _this.fileName = file.replace(/^.*[\\\/]/, '');
                console.log(_this.fileName);
            }
        }, function (err) {
            console.log(err);
        });
    };
    DetailNoticePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad DetailNoticePage');
    };
    DetailNoticePage.prototype.downloadImg = function (image) {
        //console.log(image);
        var browser = this.iab.create(image);
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
    };
    DetailNoticePage.prototype.editBoard = function () {
        this.navCtrl.push(EditNoticePage, {
            boardId: this.todo.boardId,
            userNo: this.todo.userNo
        });
    };
    DetailNoticePage.prototype.delBoard = function () {
        var _this = this;
        this.todo.boardId = this.todo.boardId;
        this.todo.boardType = "NT";
        var alert = this.alertCtrl.create({
            title: '',
            message: '정말 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: '삭제',
                    handler: function () {
                        _this.boardProvider.delBoard(_this.todo).then(function (data) {
                            //console.log(data);
                            _this.navCtrl.pop();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DetailNoticePage.prototype.downloadFile = function () {
        var _this = this;
        if (this.fileURI == "첨부파일없음") {
            return;
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: '',
                message: '파일을 다운받으시겠습니까?',
                buttons: [
                    {
                        text: '취소',
                        role: 'cancel',
                        handler: function () {
                        }
                    },
                    {
                        text: '다운',
                        handler: function () {
                            var loader = _this.loadingCtrl.create({
                                content: "Uploading..."
                            });
                            loader.present();
                            var trustHosts = true;
                            var fileTransfer = _this.fileTransfer.create();
                            fileTransfer.download(_this.fileURI, _this.storageDirectory + _this.fileName, trustHosts).then(function (entry) {
                                loader.dismiss();
                            }, function (error) {
                                console.log(error);
                                loader.dismiss();
                            });
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    DetailNoticePage.prototype.leaveComment = function () {
        var _this = this;
        this.comment.boardId = this.todo.boardId;
        this.comment.userNo = this.todo.userNo;
        console.log(this.comment);
        this.boardProvider.leaveComment(this.comment).then(function (data) {
            _this.viewReply();
            _this.comment.replyContent = '';
        }, function (err) {
            console.log(err);
        });
    };
    DetailNoticePage.prototype.viewReply = function () {
        var _this = this;
        this.replys = [];
        this.comment.boardId = this.todo.boardId;
        this.boardProvider.viewReply(this.comment).then(function (data) {
            //console.log(data);
            for (var i in data) {
                _this.replys.push(data[i]);
                if (data[i].user_no == _this.todo.userNo) {
                    _this.replys[i]["replyAuth"] = true;
                }
                else {
                    //this.replys[i].set("replyAuth",false);
                    _this.replys[i]["replyAuth"] = false;
                }
            }
            //console.log(this.replys);
        }, function (err) {
            console.log(err);
        });
    };
    DetailNoticePage.prototype.deleteComment = function (replyId) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: '해당 댓글을 정말로 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: '삭제',
                    handler: function () {
                        _this.comment.replyId = replyId + "";
                        _this.boardProvider.deleteComment(_this.comment).then(function (data) {
                            _this.viewReply();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DetailNoticePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-detail-notice',
            templateUrl: 'detail-notice.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BoardProvider,
            Storage,
            FileTransfer,
            File,
            Platform,
            AlertController,
            LoadingController,
            PopoverController,
            ToastController,
            InAppBrowser])
    ], DetailNoticePage);
    return DetailNoticePage;
}());
export { DetailNoticePage };
//# sourceMappingURL=detail-notice.js.map