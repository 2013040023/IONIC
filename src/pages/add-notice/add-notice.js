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
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
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
var AddNoticePage = /** @class */ (function () {
    function AddNoticePage(navCtrl, navParams, fileTransfer, camera, loadingCtrl, toastCtrl, filepath, boardProvider, storage, platform, alertCtrl, fileChooser) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fileTransfer = fileTransfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.filepath = filepath;
        this.boardProvider = boardProvider;
        this.storage = storage;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.fileChooser = fileChooser;
        //public apiUrl = 'http://192.168.0.60:8080';
        //public apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        this.todo = {
            boardTitle: '',
            boardContent: '',
            userNo: '',
            boardType: '',
        };
    }
    AddNoticePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fileURI = '';
        //console.log('ionViewDidLoad AddNoticePage');
        this.storage.get('user_no').then(function (val) {
            _this.todo.userNo = val + "";
        });
        this.imageURI = [];
        if (this.platform.is('ios')) {
            this.PFios = true;
            this.PFandroid = false;
        }
        else if (this.platform.is('android')) {
            this.PFandroid = true;
            this.PFios = false;
        }
    };
    AddNoticePage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            if (_this.imageURI.length > 2) {
                var alert_1 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                    buttons: ['확인']
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: '',
                    subTitle: imageData + "올립니다.",
                    buttons: ['확인']
                });
                alert_2.present();
                _this.imageURI.push(imageData);
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddNoticePage.prototype.deletePhoto = function (index) {
        this.imageURI.splice(index, 1);
    };
    AddNoticePage.prototype.getImage = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 600,
            targetHeight: 600,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            if (_this.imageURI.length > 2) {
                var alert_3 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                    buttons: ['확인']
                });
                alert_3.present();
                loader.dismiss();
            }
            else {
                _this.imageURI.push(imageData);
                loader.dismiss();
            }
        }, function (err) {
            loader.dismiss();
            console.log(err);
            _this.presentToast(err);
        });
    };
    AddNoticePage.prototype.upFile = function () {
        var _this = this;
        this.fileChooser.open().then(function (uri) {
            //console.log(uri);
            _this.filepath.resolveNativePath(uri).then(function (fileentry) {
                _this.fileURI = fileentry;
                _this.fileName = fileentry.replace(/^.*[\\\/]/, '');
            });
        });
    };
    AddNoticePage.prototype.uploadFile = function () {
        var _this = this;
        if (this.todo.boardTitle == "" || this.todo.boardContent == "") {
            var alert_4 = this.alertCtrl.create({
                subTitle: '제목과 내용은 반드시 입력되어야 합니다.',
                buttons: ['확인']
            });
            alert_4.present();
        }
        else {
            this.todo.boardType = "NT";
            var loader_1 = this.loadingCtrl.create({
                content: "Uploading..."
            });
            loader_1.present();
            this.boardProvider.uploadBoard(this.todo).then(function (data) {
                //console.log("pass");
                _this.uploadImage(data["boardId"], loader_1);
                _this.uploadFileFile(data["boardId"], loader_1);
            }, function (err) {
                console.log(err);
                loader_1.dismiss();
            });
        }
    };
    AddNoticePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    };
    AddNoticePage.prototype.myFunction = function () {
        this.uploadFile();
    };
    AddNoticePage.prototype.uploadImage = function (boardId, loader) {
        if (this.imageURI.length == 0) {
            return;
        }
        else {
            for (var i = 0; i < this.imageURI.length; i++) {
                var options = {
                    fileKey: "file",
                    fileName: (i + 1) + "",
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: {
                        "userNo": this.todo.userNo,
                        "boardType": this.todo.boardType,
                        "boardId": boardId + ""
                    }
                };
                var Transfer = this.fileTransfer.create();
                Transfer.upload(this.imageURI[i], this.apiUrl + '/board/uploadImage', options)
                    .then(function (data) {
                }, function (err) {
                });
            }
        }
    };
    AddNoticePage.prototype.uploadFileFile = function (boardId, loader) {
        var _this = this;
        if (this.fileURI != '') {
            var options = {
                fileKey: "file",
                fileName: this.fileName,
                //chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    "userNo": this.todo.userNo,
                    "boardType": this.todo.boardType,
                    "boardId": boardId + ""
                }
            };
            var Transfer = this.fileTransfer.create();
            Transfer.upload(this.fileURI, this.apiUrl + '/board/uploadfile', options)
                .then(function (data) {
                _this.presentToast("upload success");
                loader.dismiss();
                _this.navCtrl.pop();
            }, function (err) {
                //console.log(err);
                _this.presentToast("file upload fail");
                loader.dismiss();
                _this.navCtrl.pop();
            });
        }
        else {
            this.presentToast("upload success");
            loader.dismiss();
            this.navCtrl.pop();
        }
    };
    AddNoticePage.prototype.deleteFile = function () {
        this.fileURI = '';
        this.fileName = '';
    };
    AddNoticePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-notice',
            templateUrl: 'add-notice.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FileTransfer,
            Camera,
            LoadingController,
            ToastController,
            FilePath,
            BoardProvider,
            Storage,
            Platform,
            AlertController,
            FileChooser])
    ], AddNoticePage);
    return AddNoticePage;
}());
export { AddNoticePage };
//# sourceMappingURL=add-notice.js.map