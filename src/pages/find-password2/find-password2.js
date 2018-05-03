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
import { RestProvider } from '../../providers/rest/rest';
import { SMS } from "@ionic-native/sms";
import { FindPassword3Page } from '../find-password3/find-password3';
/**
 * Generated class for the FindPassword2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FindPassword2Page = /** @class */ (function () {
    function FindPassword2Page(sms, navCtrl, navParams, alertCtrl, restProvider) {
        this.sms = sms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.restProvider = restProvider;
        this.todo = {
            userNo: '',
            username: '',
            userPhoneNumber: '',
            userNumberCheck: '',
            userNumberInput: '',
            userAllow: ''
        };
        this.userId = navParams.get('userId');
    }
    FindPassword2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FindPassword2Page');
    };
    FindPassword2Page.prototype.checkNumber = function () {
        var _this = this;
        if (this.todo.userPhoneNumber == "" || this.todo.userPhoneNumber.length != 11) {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: '휴대전화 번호를 정확하게 입력해주시기 바랍니다.',
                buttons: ['확인']
            });
            alert_1.present();
            return;
        }
        this.restProvider.getPhoneFindNumber(this.todo).then(function (data) {
            var check_num = data["check_num"];
            //console.log(check_num);
            if (check_num == "undefined") {
                var alert_2 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '해당 번호로 가입된 회원이 없습니다.',
                    buttons: ['확인']
                });
                alert_2.present();
                return;
            }
            else {
                var Message = "인증번호는 [" + check_num + "] 입니다.";
                _this.todo.userNumberCheck = check_num;
                console.log(_this.todo.userNumberCheck);
                //console.log(Message);
                var options;
                _this.sms.send(_this.todo.userPhoneNumber, Message, options)
                    .then(function () {
                    var alert = _this.alertCtrl.create({
                        title: '',
                        subTitle: '인증번호 입력란에 인증번호를 입력하고 인증을 해주세요.',
                        buttons: ['확인']
                    });
                    alert.present();
                }).catch(function (err) {
                    console.log(JSON.stringify(err));
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FindPassword2Page.prototype.findID1 = function () {
        if (this.todo.userNumberCheck == this.todo.userNumberInput && this.todo.userNumberInput != '') {
            this.todo.userAllow = "true";
            var alert_3 = this.alertCtrl.create({
                title: '',
                subTitle: '인증되었습니다.',
                buttons: ['확인']
            });
            alert_3.present();
            this.navCtrl.push(FindPassword3Page, {
                userId: this.userId
            });
        }
        else {
            this.todo.userAllow = '';
            var alert_4 = this.alertCtrl.create({
                title: '',
                subTitle: '인증번호가 틀립니다.',
                buttons: ['확인']
            });
            alert_4.present();
        }
    };
    FindPassword2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-find-password2',
            templateUrl: 'find-password2.html',
        }),
        __metadata("design:paramtypes", [SMS, NavController, NavParams, AlertController, RestProvider])
    ], FindPassword2Page);
    return FindPassword2Page;
}());
export { FindPassword2Page };
//# sourceMappingURL=find-password2.js.map