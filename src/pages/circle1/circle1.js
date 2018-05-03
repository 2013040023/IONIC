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
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';
import { Popover1Component } from '../../components/popover1/popover1';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the Circle1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Circle1Page = /** @class */ (function () {
    function Circle1Page(navCtrl, navParams, groupProvider, popoverCtrl, alertCtrl, userProvider, storage, sanitizer, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupProvider = groupProvider;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.userProvider = userProvider;
        this.storage = storage;
        this.sanitizer = sanitizer;
        this.callNumber = callNumber;
        this.groupModel = {
            groupType: 'WONWOO',
            groupName: '',
            groupNo: '',
            groupMemberNo: '',
            groupMemberName: '',
            groupMemberOrder: '',
            groupMemberHdp: '',
            groupMemberPhone: ''
        };
        this.groupAddPopup = false;
        this.memberAddPopup = false;
        this.searchUser = {
            userName: '',
            ceoCtg: ''
        };
        this.AdminAuth = false;
        this.userAuth = {
            userNo: ''
        };
    }
    Circle1Page.prototype.presentPopover = function (myEvent) {
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
    Circle1Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.groups = [];
        //console.log('ionViewDidLoad Circle1Page');
        this.groupProvider.groupSelect(this.groupModel).then(function (data) {
            _this.groups = data;
            //console.log(this.groups);
            for (var i in data) {
                if (_this.groups[i].AUTH_GROUPS != undefined) {
                    for (var j in _this.groups[i].AUTH_GROUPS) {
                        if (_this.groups[i].AUTH_GROUPS[j].CEO_IMG == undefined) {
                            _this.groups[i].AUTH_GROUPS[j]["CEO_IMG"] = "assets/imgs/nonImg.png";
                        }
                        _this.groups[i].AUTH_GROUPS[j].CEO_ORDER = "제" + _this.groups[i].AUTH_GROUPS[j].CEO_ORDER.substr(2, 4) + "기";
                        var phone = _this.groups[i].AUTH_GROUPS[j].CEO_HDP_NO01;
                        _this.groups[i].AUTH_GROUPS[j].CEO_HDP_NO01 = phone.substr(0, 3) + "-" + phone.substr(2, 4) + "-" + phone.substr(7);
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
        this.storage.get('user_no').then(function (val) {
            _this.userAuth.userNo = val;
            console.log(_this.userAuth);
            _this.userProvider.userSelect(_this.userAuth).then(function (data) {
                console.log(data);
                var userAuth = data[0].user_auth;
                console.log(userAuth);
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
    Circle1Page.prototype.addGroup = function () {
        //팝업오픈
        this.groupAddPopup = true;
        var popup = document.getElementById("layer1");
        var popHeight = 150;
        var adHeight = (window.innerHeight / 2 - popHeight / 2) + "px";
        popup.style.marginTop = adHeight;
    };
    Circle1Page.prototype.delGroup = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('그룹목록');
        for (var i in this.groups) {
            alert.addInput({
                type: 'radio',
                label: this.groups[i].CEO_AUTH_NM,
                value: this.groups[i].CEO_AUTH_NO
            });
        }
        alert.addButton('취소');
        alert.addButton({
            text: '삭제',
            handler: function (data) {
                //console.log(data);
                _this.groupModel.groupNo = data;
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
    Circle1Page.prototype.popupClose = function () {
        this.groupAddPopup = false;
        this.memberAddPopup = false;
    };
    Circle1Page.prototype.addGroups = function () {
        //this.groups = [];
        var _this = this;
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
    Circle1Page.prototype.addMember = function (ceoAuthNo) {
        var _this = this;
        this.memberAddPopup = true;
        this.groupModel.groupNo = ceoAuthNo;
        var popup = document.getElementById("layer2");
        //var popWidth = popup.offsetWidth;
        var popHeight = 300;
        var adHeight = (window.innerHeight / 2 - popHeight / 2) + "px";
        popup.style.marginTop = adHeight;
        this.userProvider.userSelect(this.searchUser).then(function (data) {
            //console.log(data);
            _this.users = data;
            for (var i in data) {
                _this.users[i].CEO_ORDER = "제" + data[i].CEO_ORDER.substr(2, 4) + "기";
            }
        }, function (err) {
            console.log(err);
        });
    };
    Circle1Page.prototype.userSearch = function () {
        var _this = this;
        this.userProvider.userSelect(this.searchUser).then(function (data) {
            //console.log(data);
            _this.users = data;
            for (var i in data) {
                _this.users[i].CEO_ORDER = "제" + data[i].CEO_ORDER.substr(2, 4) + "기";
            }
        }, function (err) {
            console.log(err);
        });
    };
    Circle1Page.prototype.userSelected = function (ceoNo) {
        var _this = this;
        this.groupModel.groupMemberNo = ceoNo;
        this.groupProvider.groupMemberAdd(this.groupModel).then(function (data) {
            //console.log(data);
            _this.memberAddPopup = false;
            _this.ionViewDidLoad();
        }, function (err) {
            console.log(err);
        });
    };
    Circle1Page.prototype.delGroupMember = function (ceoNo) {
        var _this = this;
        this.groupModel.groupMemberNo = ceoNo;
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
    Circle1Page.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    Circle1Page.prototype.phoneCall = function (phoneNum) {
        this.callNumber.callNumber(phoneNum, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    Circle1Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-circle1',
            templateUrl: 'circle1.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            GroupProvider,
            PopoverController,
            AlertController,
            UserProvider,
            Storage,
            DomSanitizer,
            CallNumber])
    ], Circle1Page);
    return Circle1Page;
}());
export { Circle1Page };
//# sourceMappingURL=circle1.js.map