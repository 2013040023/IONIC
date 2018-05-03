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
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { BoardProvider } from '../../providers/board/board';
import { FileChooser } from '@ionic-native/file-chooser';
/**
 * Generated class for the EditNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditNoticePage = /** @class */ (function () {
    function EditNoticePage(navCtrl, navParams, fileTransfer, camera, loadingCtrl, toastCtrl, filepath, boardProvider, alertCtrl, platform, fileChooser
    //private storage: Storage
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fileTransfer = fileTransfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.filepath = filepath;
        this.boardProvider = boardProvider;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.fileChooser = fileChooser;
        //public apiUrl = 'http://192.168.0.60:8080';
        //public apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        this.imageURI = new Array;
        this.count = 0;
        this.todo = {
            boardTitle: '',
            boardContent: '',
            userNo: '',
            boardType: '',
            boardId: '',
            fileName: '',
            imgCount: ''
        };
        this.todo.boardId = navParams.get('boardId');
        this.todo.userNo = navParams.get('userNo');
    }
    EditNoticePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //console.log('ionViewDidLoad EditNoticePage');
        this.photos = [];
        this.boardProvider.viewBoard(this.todo).then(function (data) {
            _this.todo.userNo = data[0].user_no;
            _this.todo.boardTitle = data[0].board_title;
            _this.todo.boardContent = data[0].board_content;
            _this.todo.fileName = "";
            _this.todo.imgCount = "";
            if (data[0].board_img1 != undefined) {
                _this.photos.push(data[0].board_img1);
                //console.log(data[0].board_img1.replace(/^.*[\\\/]/, ''));
            }
            if (data[0].board_img2 != undefined) {
                _this.photos.push(data[0].board_img2);
            }
            if (data[0].board_img3 != undefined) {
                _this.photos.push(data[0].board_img3);
            }
            var file = data[0].board_file;
            //console.log(file);
            if (file != undefined) {
                if (file == "첨부파일없음") {
                    _this.fileName = "";
                    _this.fileURI = "";
                }
                else {
                    _this.fileURI = file;
                    _this.fileName = file.replace(/^.*[\\\/]/, '');
                }
            }
            else {
                _this.fileURI = '';
                _this.fileName = '';
            }
        }, function (err) {
            console.log(err);
        });
        if (this.platform.is('ios')) {
            this.PFios = true;
            this.PFandroid = false;
        }
        else if (this.platform.is('android')) {
            this.PFandroid = true;
            this.PFios = false;
        }
    };
    EditNoticePage.prototype.deletePhoto = function (index) {
        this.photos.splice(index, 1);
        //this.imageURI.splice(index,1);
    };
    EditNoticePage.prototype.takePhoto = function () {
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
            if (_this.photos.length > 2) {
                var alert_1 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                    buttons: ['확인']
                });
                alert_1.present();
            }
            else {
                _this.photos.push(imageData);
            }
        }, function (err) {
            console.log(err);
        });
    };
    EditNoticePage.prototype.getImage = function () {
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
            if (_this.photos.length > 2) {
                var alert_2 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '이미지는 최대 3개까지 업로드가 가능합니다.',
                    buttons: ['확인']
                });
                alert_2.present();
                loader.dismiss();
            }
            else {
                _this.photos.push(imageData);
                loader.dismiss();
            }
        }, function (err) {
            loader.dismiss();
            console.log(err);
            _this.presentToast(err);
        });
    };
    EditNoticePage.prototype.upFile = function () {
        var _this = this;
        this.fileChooser.open().then(function (uri) {
            //console.log(uri);
            _this.filepath.resolveNativePath(uri).then(function (fileentry) {
                _this.fileURI = fileentry;
                _this.fileName = fileentry.replace(/^.*[\\\/]/, '');
            });
        });
    };
    EditNoticePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    };
    EditNoticePage.prototype.myFunction = function () {
        this.uploadFile();
    };
    EditNoticePage.prototype.uploadFile = function () {
        var _this = this;
        this.todo.boardType = "NT";
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        this.boardProvider.uploadBoard(this.todo).then(function (data) {
            //console.log("pass");
            //loader.dismiss();
            _this.uploadImage(data["boardId"], loader);
            _this.uploadFileFile(data["boardId"], loader);
        }, function (err) {
            console.log(err);
            //loader.dismiss();
        });
    };
    EditNoticePage.prototype.uploadImage = function (boardId, loader) {
        if (this.photos.length == 0) {
            return;
        }
        else {
            for (var i = 0; i < this.photos.length; i++) {
                var type = this.photos[i].substr(0, 4);
                if (type == "http") {
                    this.todo.fileName = this.photos[i].replace(/^.*[\\\/]/, '');
                    this.todo.imgCount = (i + 1) + "";
                    this.todo.boardId = boardId;
                    this.boardProvider.uploadBoard(this.todo).then(function (data) {
                    }, function (err) {
                        //console.log(err)
                    });
                }
                else if (type == "file") {
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
                    Transfer.upload(this.photos[i], this.apiUrl + '/board/uploadImage', options)
                        .then(function (data) {
                    }, function (err) {
                    });
                }
            }
        }
    };
    EditNoticePage.prototype.uploadFileFile = function (boardId, loader) {
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
            loader.dismiss();
            this.navCtrl.pop();
        }
    };
    EditNoticePage.prototype.deleteFile = function () {
        this.fileURI = '';
        this.fileName = '';
    };
    EditNoticePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-notice',
            templateUrl: 'edit-notice.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FileTransfer,
            Camera,
            LoadingController,
            ToastController,
            FilePath,
            BoardProvider,
            AlertController,
            Platform,
            FileChooser
            //private storage: Storage
        ])
    ], EditNoticePage);
    return EditNoticePage;
}());
export { EditNoticePage };
//# sourceMappingURL=edit-notice.js.map