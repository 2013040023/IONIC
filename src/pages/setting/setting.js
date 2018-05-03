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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingPage = /** @class */ (function () {
    function SettingPage(navCtrl, navParams, storage, alertCtrl, userProvider, fileTransfer, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.userProvider = userProvider;
        this.fileTransfer = fileTransfer;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        //public apiUrl = 'http://192.168.0.60:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        this.todo = {
            userNo: '',
        };
        this.user = {
            userNo: '',
            ceoImg: '',
            ceoOrder: '',
            userName: '',
            phoneNum: '',
            ceoEmail: '',
            ceoCpn: '',
            ceoCtg: '',
            ceoSpot: '',
            ceoCpnNo: '',
            ceoFaxNo: '',
            ceoRtAddr: '',
            ceoOrderNm: ''
        };
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('autologin').then(function (val) {
            if (val == "1") {
                _this.autologinToggle = true;
            }
            else {
                _this.autologinToggle = false;
            }
        });
        this.storage.get('user_no').then(function (val) {
            _this.todo.userNo = val;
            //console.log(this.todo)
            _this.userProvider.userSelect(_this.todo).then(function (data) {
                //console.log(data);
                if (data[0].CEO_IMG == undefined) {
                    _this.user.ceoImg = "assets/imgs/nonImg.png";
                }
                else {
                    _this.user.ceoImg = data[0].CEO_IMG;
                }
                _this.user.ceoOrder = data[0].CEO_ORDER;
                _this.user.phoneNum = data[0].CEO_HDP_NO01.substr(0, 3) + "-" + data[0].CEO_HDP_NO01.substr(3, 4) + "-" + data[0].CEO_HDP_NO01.substr(7);
                _this.user.userName = data[0].CEO_NM;
                _this.user.ceoEmail = data[0].CEO_EMIL;
                _this.user.ceoCpn = data[0].CEO_CPN;
                _this.user.ceoCtg = data[0].CEO_CTG;
                _this.user.ceoSpot = data[0].CEO_SPOT;
                _this.user.ceoCpnNo = _this.chInputNumber(data[0].CEO_CPN_NO01);
                _this.user.ceoFaxNo = _this.chInputNumber(data[0].CEO_FAX_NO01);
                _this.user.ceoRtAddr = data[0].CEO_RT_ADDR;
                _this.gisuSelect();
            }, function (err) {
                console.log(err);
            });
        });
    };
    SettingPage.prototype.updateAutologin = function () {
        if (this.autologinToggle) {
            this.storage.set('autologin', "1");
        }
        else {
            this.storage.set('autologin', "0");
        }
    };
    SettingPage.prototype.deleteUser = function () {
        var _this = this;
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
                        _this.userProvider.userDelete(_this.todo).then(function (data) {
                            _this.storage.set('autologin', "0");
                            _this.navCtrl.setRoot(HomePage);
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    SettingPage.prototype.clickSubmit = function () {
        this.updateUserInfo();
    };
    SettingPage.prototype.updateUserInfo = function () {
        var _this = this;
        this.user.userNo = this.todo.userNo;
        if (this.user.ceoEmail == '') {
            var alert_1 = this.alertCtrl.create({
                subTitle: '이메일을 입력해주세요.',
                buttons: ['확인']
            });
            alert_1.present();
            return;
        }
        if (this.user.ceoCpn == '') {
            var alert_2 = this.alertCtrl.create({
                subTitle: '회사명을 입력해주세요.',
                buttons: ['확인']
            });
            alert_2.present();
            return;
        }
        if (this.user.ceoCtg == '') {
            var alert_3 = this.alertCtrl.create({
                subTitle: '회사 업종을 입력해주세요.',
                buttons: ['확인']
            });
            alert_3.present();
            return;
        }
        if (this.user.ceoSpot == '') {
            var alert_4 = this.alertCtrl.create({
                subTitle: '회사 직위를 입력해주세요.',
                buttons: ['확인']
            });
            alert_4.present();
            return;
        }
        if (this.user.ceoCpnNo == '') {
            var alert_5 = this.alertCtrl.create({
                subTitle: '회사 전화번호를 입력해주세요.',
                buttons: ['확인']
            });
            alert_5.present();
            return;
        }
        if (this.user.ceoFaxNo == '') {
            var alert_6 = this.alertCtrl.create({
                subTitle: '회사 팩스번호를 입력해주세요.',
                buttons: ['확인']
            });
            alert_6.present();
            return;
        }
        if (this.user.ceoRtAddr == '') {
            var alert_7 = this.alertCtrl.create({
                subTitle: '회사 주소를 입력해주세요.',
                buttons: ['확인']
            });
            alert_7.present();
            return;
        }
        else {
            this.userProvider.updateUserInfo(this.user).then(function (data) {
                _this.navCtrl.pop();
            }, function (err) {
                console.log(err);
            });
        }
    };
    SettingPage.prototype.actionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '사진찍기',
                    handler: function () {
                        //console.log('Archive clicked');
                        var options = {
                            quality: 90,
                            destinationType: _this.camera.DestinationType.FILE_URI,
                            encodingType: _this.camera.EncodingType.JPEG,
                            sourceType: _this.camera.PictureSourceType.CAMERA,
                            targetWidth: 600,
                            targetHeight: 600,
                            saveToPhotoAlbum: false,
                            correctOrientation: true
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            _this.user.ceoImg = imageData;
                            _this.updatePhoto();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                },
                {
                    text: '앨범에서 가져오기',
                    handler: function () {
                        var options = {
                            quality: 90,
                            destinationType: _this.camera.DestinationType.FILE_URI,
                            encodingType: _this.camera.EncodingType.JPEG,
                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                            targetWidth: 600,
                            targetHeight: 600,
                            correctOrientation: true
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            _this.user.ceoImg = imageData;
                            _this.updatePhoto();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                },
                {
                    text: '삭제하기',
                    role: 'destructive',
                    handler: function () {
                        _this.userProvider.userImgDelete(_this.todo).then(function (data) {
                        }, function (err) {
                            console.log(err);
                        });
                        _this.user.ceoImg = 'assets/imgs/nonImg.png';
                    }
                },
                {
                    text: '취소',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SettingPage.prototype.updatePhoto = function () {
        console.log(this.todo.userNo);
        var options = {
            fileKey: "file",
            fileName: this.todo.userNo + "profile",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                "userNo": this.todo.userNo,
            },
            headers: { 'Cache-Control': 'no-cache',
                'Expires': '-1' }
        };
        var Transfer = this.fileTransfer.create();
        Transfer.upload(this.user.ceoImg, this.apiUrl + '/user/uploadImage', options)
            .then(function (data) {
            //console.log(data+" Uploaded Successfully");
        }, function (err) {
            //console.log(err);
        });
    };
    SettingPage.prototype.gisuSelect = function () {
        var _this = this;
        this.userProvider.selectUserGisu(this.user).then(function (data) {
            _this.user.ceoOrderNm = data["code_nm"];
        }, function (err) {
            console.log(err);
        });
    };
    SettingPage.prototype.chInputNumber = function (data) {
        if (data.substr(0, 2) == "02") {
        }
        else {
        }
        return data;
    };
    SettingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-setting',
            templateUrl: 'setting.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            AlertController,
            UserProvider,
            FileTransfer,
            Camera,
            ActionSheetController])
    ], SettingPage);
    return SettingPage;
}());
export { SettingPage };
//# sourceMappingURL=setting.js.map