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
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';
import { Popover1Component } from '../../components/popover1/popover1';
import { Popup1Page } from '../popup1/popup1';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the HospitalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HospitalInfoPage = /** @class */ (function () {
    function HospitalInfoPage(navCtrl, navParams, groupProvider, popoverCtrl, alertCtrl, modalCtrl, userProvider, storage, sanitizer, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupProvider = groupProvider;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.userProvider = userProvider;
        this.storage = storage;
        this.sanitizer = sanitizer;
        this.callNumber = callNumber;
        this.accordionExpanded = false;
        this.groupAddPopup = false;
        this.memberAddPopup = false;
        this.AdminAuth = false;
        this.userAuth = {
            userNo: ''
        };
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
    }
    HospitalInfoPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(Popover1Component);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (data) {
            //console.log(data);
            if (data == "add") {
                _this.addGroup();
            }
            else if (data == "del") {
                _this.delGroup();
            }
            else {
                return;
            }
        });
    };
    HospitalInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //console.log('ionViewDidLoad HospitalInfoPage');
        this.groups = [];
        //모델 초기화
        this.groupModel.groupMemberEmail = '';
        this.groupModel.groupMemberName = '';
        this.groupModel.groupMemberPhone = '';
        this.groupModel.groupMemberSpot = '';
        this.groupModel.groupName = '';
        this.groupModel.GroupNo = '';
        this.groupProvider.groupSelect(this.groupModel).then(function (data) {
            _this.groups = data;
            //console.log(data);
            for (var i in data) {
                _this.groups[i]["accordionExpanded"] = false;
                _this.groups[i]["userPlus"] = false;
                _this.groups[i]["caretUp"] = false;
                _this.groups[i]["caretDown"] = true;
                for (var j in _this.groups[i].HSPT_GROUPS) {
                    //console.log(this.groups[i]);
                    if (_this.groups[i].HSPT_GROUPS[j].HSPT_MEMBER_IMG == undefined) {
                        _this.groups[i].HSPT_GROUPS[j].HSPT_MEMBER_IMG = "assets/imgs/nonImg.png";
                    }
                    //console.log(this.groups[i].HSPT_GROUPS[j]["HSPT_HDP_NO01"]);
                    if (_this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01 != undefined) {
                        var NuberText = _this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01 + "";
                        //console.log(NuberText.length);
                        if (NuberText.length == 10) {
                            //[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                            _this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01 = NuberText.substr(0, 3) + "-" + NuberText.substr(3, 3) + "-" + NuberText.substr(6);
                        }
                        else if (NuberText.length == 11) {
                            _this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01 = NuberText.substr(0, 3) + "-" + NuberText.substr(3, 4) + "-" + NuberText.substr(7);
                        }
                    }
                }
            }
            //console.log(this.groups);
        }, function (err) {
            console.log(err);
        });
        this.storage.get('user_no').then(function (val) {
            _this.userAuth.userNo = val;
            //console.log(this.userAuth)
            _this.userProvider.userSelect(_this.userAuth).then(function (data) {
                //console.log(data);
                var userAuth = data[0].user_auth;
                //console.log(userAuth);
                if (userAuth == "A") {
                    _this.AdminAuth = true;
                }
                else {
                    _this.AdminAuth = false;
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    HospitalInfoPage.prototype.addGroup = function () {
        //팝업오픈
        this.groupAddPopup = true;
        var popup = document.getElementById("layer1");
        //var popWidth = popup.offsetWidth;
        var popHeight = 150;
        //console.log(popHeight);
        //console.log(window.innerHeight);
        var adHeight = (window.innerHeight / 2 - popHeight / 2) + "px";
        popup.style.marginTop = adHeight;
    };
    HospitalInfoPage.prototype.toggleAccordion = function (index) {
        if (!this.groups[index].accordionExpanded) {
            this.groups[index].accordionExpanded = true;
            this.groups[index].userPlus = true;
            this.groups[index].caretUp = true;
            this.groups[index].caretDown = false;
        }
        else {
            this.groups[index].accordionExpanded = false;
            this.groups[index].userPlus = false;
            this.groups[index].caretUp = false;
            this.groups[index].caretDown = true;
        }
    };
    HospitalInfoPage.prototype.delGroup = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('그룹목록');
        for (var i in this.groups) {
            alert.addInput({
                type: 'radio',
                label: this.groups[i].HSPT_GROUP_NM,
                value: this.groups[i].HSPT_GROUP_NO
            });
        }
        alert.addButton('취소');
        alert.addButton({
            text: '삭제',
            handler: function (data) {
                //console.log(data);
                _this.groupModel.GroupNo = data;
                _this.groupProvider.groupDel(_this.groupModel).then(function (data) {
                    //console.log(data);
                    _this.ionViewDidLoad();
                }, function (err) {
                    console.log(err);
                });
            }
        });
        alert.present();
    };
    HospitalInfoPage.prototype.popupClose = function () {
        this.groupAddPopup = false;
        this.memberAddPopup = false;
        //모델 초기화
        this.groupModel.groupMemberEmail = '';
        this.groupModel.groupMemberName = '';
        this.groupModel.groupMemberPhone = '';
        this.groupModel.groupMemberSpot = '';
        this.groupModel.groupName = '';
        this.groupModel.GroupNo = '';
    };
    HospitalInfoPage.prototype.addGroups = function () {
        var _this = this;
        //this.groups = [];
        if (this.groupModel.groupName == '') {
            var alert_1 = this.alertCtrl.create({
                subTitle: '이름과 소속은 반드시 채워야 합니다.',
                buttons: ['확인']
            });
            alert_1.present();
        }
        else {
            this.groupProvider.groupAdd(this.groupModel).then(function (data) {
                //console.log(data);
                _this.ionViewDidLoad();
            }, function (err) {
                console.log(err);
            });
            this.groupAddPopup = false;
        }
    };
    HospitalInfoPage.prototype.addMember = function (hsptGroupNo, hsptGroupNm) {
        var _this = this;
        //this.memberAddPopup = true;
        //팝업오픈
        var profileModal = this.modalCtrl.create(Popup1Page, {
            hsptGroupNo: hsptGroupNo,
            hsptGroupNm: hsptGroupNm,
            buttonText: "추가",
            buttonCode: "AD"
        });
        profileModal.onDidDismiss(function (data) {
            //console.log(data);
            if (data["status"] == "change") {
                _this.ionViewDidLoad();
            }
        });
        profileModal.present();
        this.groupModel.groupName = hsptGroupNm;
        this.groupModel.GroupNo = hsptGroupNo;
        this.groupModel.buttonText = "추가",
            this.groupModel.buttonCode = "AD";
    };
    HospitalInfoPage.prototype.updateGroupMember = function (hsptGroupMemberNo, hsptGroupNo, hsptGroupNm, hsptNm, hsptSpot, hsptHdpNo01, hsptEmail, hsptMemberImg) {
        var _this = this;
        var profileModal = this.modalCtrl.create(Popup1Page, {
            hsptGroupNo: hsptGroupNo,
            hsptGroupNm: hsptGroupNm,
            buttonText: "변경",
            buttonCode: "CH",
            hsptGroupMemberNo: hsptGroupMemberNo,
            groupMemberName: hsptNm,
            groupMemberSpot: hsptSpot,
            groupMemberPhone: hsptHdpNo01,
            groupMemberEmail: hsptEmail,
            groupMemberImg: hsptMemberImg
        });
        profileModal.onDidDismiss(function (data) {
            //console.log(data);
            if (data["status"] == "change") {
                _this.ionViewDidLoad();
            }
            //this.ionViewDidLoad()
        });
        profileModal.present();
        this.groupModel.hsptGroupMemberNo = hsptGroupMemberNo;
        this.groupModel.groupName = hsptGroupNm;
        this.groupModel.GroupNo = hsptGroupNo;
        this.groupModel.groupMemberName = hsptNm;
        this.groupModel.groupMemberSpot = hsptSpot;
        this.groupModel.groupMemberPhone = hsptHdpNo01;
        this.groupModel.groupMemberEmail = hsptEmail;
        this.groupModel.groupMemberImg = hsptMemberImg;
        this.groupModel.buttonText = "변경",
            this.groupModel.buttonCode = "CH";
        //console.log(this.groupModel);
    };
    HospitalInfoPage.prototype.delGroupMember = function (hsptGroupMemberNo) {
        var _this = this;
        this.groupModel.hsptGroupMemberNo = hsptGroupMemberNo;
        var confirm = this.alertCtrl.create({
            message: '해당 맴버를 삭제하시겠습니까?',
            buttons: [
                {
                    text: '아니오',
                    handler: function () {
                    }
                },
                {
                    text: '예',
                    handler: function () {
                        _this.groupProvider.groupMemberDel(_this.groupModel).then(function (data) {
                            //console.log(data);
                            _this.memberAddPopup = false;
                            _this.ionViewDidLoad();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    HospitalInfoPage.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    HospitalInfoPage.prototype.phoneCall = function (phoneNum) {
        this.callNumber.callNumber(phoneNum, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    HospitalInfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-hospital-info',
            templateUrl: 'hospital-info.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            GroupProvider,
            PopoverController,
            AlertController,
            ModalController,
            UserProvider,
            Storage,
            DomSanitizer,
            CallNumber])
    ], HospitalInfoPage);
    return HospitalInfoPage;
}());
export { HospitalInfoPage };
//# sourceMappingURL=hospital-info.js.map