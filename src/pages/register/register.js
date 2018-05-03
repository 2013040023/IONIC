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
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SMS } from "@ionic-native/sms";
import CryptoJS from 'crypto-js';
import { HomePage } from '../home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(sms, navCtrl, navParams, restProvider, alertCtrl, androidPermissions, platform) {
        this.sms = sms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.todo = {
            userId: '',
            checkId: '',
            userpassword: '',
            username: '',
            userPhoneNumber: '',
            userNumberCheck: '',
            userNumberInput: '',
            userAllow: ''
        };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad RegisterPage');
        if (this.platform.is('ios')) {
            return;
        }
        else if (this.platform.is('android')) {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(function (result) { return console.log('Has permission?', result.hasPermission); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_PHONE_STATE); });
            this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_PHONE_STATE, this.androidPermissions.PERMISSION.READ_PHONE_STATE]);
        }
    };
    RegisterPage.prototype.join = function () {
        var _this = this;
        this.ceoLists = [];
        if (this.todo.userId != '' && this.todo.userpassword != '' && this.todo.username != '' && this.todo.userPhoneNumber != '' && this.todo.userAllow == "true" && this.todo.checkId == "true") {
            this.restProvider.getCeoMember(this.todo).then(function (data) {
                //console.log(data);
                if (data[0] != undefined) {
                    _this.ceoLists.push(data[i]);
                    var order = data[i].CEO_ORDER + "기수";
                    _this.ceoLists[i]["order"] = order;
                    var alert_1 = _this.alertCtrl.create();
                    alert_1.setTitle('리스트 확인');
                    for (var i in data) {
                        alert_1.addInput({
                            type: 'radio',
                            label: data[i].CEO_ORDER.substr(2, 4) + "기수" + "  " + data[i].CEO_NM,
                            value: data[i].CEO_NO,
                            checked: true
                        });
                        alert_1.addButton('Cancel');
                        alert_1.addButton({
                            text: 'OK',
                            handler: function (data) {
                                _this.join_data(data);
                            }
                        });
                        alert_1.present();
                    }
                }
                else {
                    _this.confirmAlert("해당 번호는 원우회원 리스트에 존재하지 않습니다.");
                    return;
                }
                //console.log(this.ceoLists);
            }, function (err) {
                console.log(err);
                return;
            });
        }
        else {
            if (this.todo.checkId != "true") {
                this.confirmAlert("중복확인이 되지 않았습니다.");
            }
            else if (this.todo.userAllow != "true") {
                this.confirmAlert("인증번호를 입력하지 않았습니다.");
            }
            else {
                this.confirmAlert("필수항목이 입력되지 않았습니다.");
            }
        }
    };
    RegisterPage.prototype.confirm = function () {
        if (this.todo.userNumberCheck == this.todo.userNumberInput && this.todo.userNumberInput != '') {
            this.todo.userAllow = "true";
            this.confirmAlert("인증되었습니다.");
        }
        else {
            this.confirmAlert("인증번호가 틀립니다.");
        }
    };
    RegisterPage.prototype.checkUserId = function () {
        var _this = this;
        if (this.todo.userId == "") {
            this.confirmAlert("아이디를 입력해주세요.");
        }
        this.restProvider.checkUser(this.todo).then(function (data) {
            var checkUser = data["checkUserId"];
            //console.log(checkUser);
            if (checkUser == "true") {
                _this.todo.checkId = "true";
                _this.confirmAlert("아이디 사용이 가능합니다.");
            }
            else {
                _this.todo.checkId = '';
                _this.confirmAlert("해당아이디는 사용자가 존재합니다.");
            }
        }, function (err) {
            console.log(err);
        });
    };
    RegisterPage.prototype.checkNumber = function () {
        var _this = this;
        if (this.todo.userPhoneNumber == "") {
            this.confirmAlert("휴대전화 번호를 정확하게 입력해주시기 바랍니다.");
            return;
        }
        this.restProvider.getPhoneCheckNumber(this.todo).then(function (data) {
            var check_num = data["check_num"];
            //	test용도
            console.log(check_num);
            if (check_num == "undefined") {
                _this.confirmAlert("해당 번호는 가입된 회원 입니다.");
            }
            else {
                var Message = "회원가입 인증번호는 [" + check_num + "] 입니다.";
                _this.todo.userNumberCheck = check_num;
                var options;
                _this.sms.send(_this.todo.userPhoneNumber, Message, options)
                    .then(function () {
                    _this.confirmAlert("인증번호 입력란에 인증번호를 입력하고 인증을 해주세요.");
                }).catch(function (err) {
                    //console.log(JSON.stringify(err))
                });
                return;
            }
        }, function (err) {
            console.log(err);
        });
    };
    RegisterPage.prototype.confirmAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: '',
            subTitle: message,
            buttons: ['확인']
        });
        alert.present();
    };
    RegisterPage.prototype.join_data = function (data) {
        var hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
        this.todo.userpassword = hash;
        this.todo['ceo_no'] = data;
        //console.log(this.todo);
        this.restProvider.joinUser(this.todo).then(function (data) {
            console.log("success join!!");
        }, function (err) {
            console.log(err);
        });
        this.navCtrl.setRoot(HomePage);
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [SMS,
            NavController,
            NavParams,
            RestProvider,
            AlertController,
            AndroidPermissions,
            Platform])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map