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
import { FindPassword2Page } from '../find-password2/find-password2';
/**
 * Generated class for the FindPassword1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FindPassword1Page = /** @class */ (function () {
    function FindPassword1Page(navCtrl, navParams, restProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.todo = {
            userId: ''
        };
    }
    FindPassword1Page.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FindPassword1Page');
    };
    FindPassword1Page.prototype.checkID = function () {
        var _this = this;
        if (this.todo.userId == "") {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: '아이디를 입력해주세요',
                buttons: ['확인']
            });
            alert_1.present();
            return;
        }
        this.restProvider.checkUser(this.todo).then(function (data) {
            var checkUser = data["checkUserId"];
            //console.log(checkUser);
            if (checkUser == "true") {
                var alert_2 = _this.alertCtrl.create({
                    title: '',
                    subTitle: '해당아이디는 사용 유저가 없습니다.',
                    buttons: ['확인']
                });
                alert_2.present();
                return;
            }
            else {
                _this.navCtrl.push(FindPassword2Page, {
                    userId: _this.todo.userId
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FindPassword1Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-find-password1',
            templateUrl: 'find-password1.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, AlertController])
    ], FindPassword1Page);
    return FindPassword1Page;
}());
export { FindPassword1Page };
//# sourceMappingURL=find-password1.js.map