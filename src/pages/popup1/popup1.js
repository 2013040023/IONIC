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
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';
import { UserProvider } from '../../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the Popup1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Popup1Page = /** @class */ (function () {
    function Popup1Page(viewCtrl, navParams, groupProvider, alertCtrl, fileTransfer, userProvider, camera, actionSheetCtrl) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.groupProvider = groupProvider;
        this.alertCtrl = alertCtrl;
        this.fileTransfer = fileTransfer;
        this.userProvider = userProvider;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        //public apiUrl = 'http://192.168.0.60:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        this.groupModel = {
            groupName: '',
            GroupNo: '',
            groupMemberName: '',
            groupMemberPhone: '',
            groupMemberEmail: '',
            groupMemberSpot: '',
            buttonText: '',
            buttonCode: '',
            hsptGroupMemberNo: '',
            groupMemberImg: ''
        };
        this.buttonData = {
            status: ''
        };
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
        if (this.groupModel.groupMemberImg == undefined) {
            this.groupModel.groupMemberImg = "assets/imgs/nonImg.png";
        }
    }
    Popup1Page.prototype.ionViewDidLoad = function () {
        console.log(this.groupModel);
        //console.log('ionViewDidLoad Popup1Page');
        var popup = document.getElementById("layer");
        var popHeight = popup.offsetHeight;
        var adHeight = (window.innerHeight / 2 - popHeight / 2) + "px";
        popup.style.marginTop = adHeight;
    };
    Popup1Page.prototype.popupClose = function () {
        this.buttonData.status = "cancel";
        this.viewCtrl.dismiss(this.buttonData);
    };
    Popup1Page.prototype.addGroupMember = function () {
        var _this = this;
        console.log(this.groupModel);
        if (this.groupModel.groupMemberName == undefined ||
            this.groupModel.groupMemberSpot == undefined ||
            this.groupModel.groupMemberName == '' ||
            this.groupModel.groupMemberSpot == '') {
            var alert_1 = this.alertCtrl.create({
                subTitle: '이름과 소속은 반드시 채워야 합니다.',
                buttons: ['확인']
            });
            alert_1.present();
        }
        else {
            if (this.groupModel.groupMemberPhone != undefined || this.groupModel.groupMemberPhone != '') {
                if (this.groupModel.groupMemberPhone.length != 11) {
                    var alert_2 = this.alertCtrl.create({
                        subTitle: '폰번호는 11자리여야 합니다.',
                        buttons: ['확인']
                    });
                    alert_2.present();
                    return;
                }
            }
            this.groupProvider.groupMemberAdd(this.groupModel).then(function (data) {
                _this.buttonData.status = "change";
                _this.viewCtrl.dismiss(_this.buttonData);
            }, function (err) {
                console.log(err);
                _this.buttonData.status = "cancel";
                _this.viewCtrl.dismiss(_this.buttonData);
            });
        }
    };
    Popup1Page.prototype.actionSheet = function () {
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
                            _this.groupModel.groupMemberImg = imageData;
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
                            _this.groupModel.groupMemberImg = imageData;
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
                        _this.userProvider.userImgDelete(_this.groupModel).then(function (data) {
                        }, function (err) {
                            console.log(err);
                        });
                        _this.groupModel.groupMemberImg = 'assets/imgs/nonImg.png';
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
    Popup1Page.prototype.updatePhoto = function () {
        //console.log(this.todo.userNo);
        var options = {
            fileKey: "file",
            fileName: "hospitalProfile",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                "userNo": this.groupModel.hsptGroupMemberNo,
            },
            headers: { 'Cache-Control': 'no-cache',
                'Expires': '-1' }
        };
        var Transfer = this.fileTransfer.create();
        Transfer.upload(this.groupModel.groupMemberImg, this.apiUrl + '/user/uploadImage', options)
            .then(function (data) {
            //console.log(data+" Uploaded Successfully");
        }, function (err) {
            //console.log(err);
        });
    };
    Popup1Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-popup1',
            templateUrl: 'popup1.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams,
            GroupProvider,
            AlertController,
            FileTransfer,
            UserProvider,
            Camera,
            ActionSheetController])
    ], Popup1Page);
    return Popup1Page;
}());
export { Popup1Page };
//# sourceMappingURL=popup1.js.map