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
import CryptoJS from 'crypto-js';
import { HomePage } from '../home/home';
/**
 * Generated class for the FindPassword3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FindPassword3Page = /** @class */ (function () {
    function FindPassword3Page(navCtrl, navParams, restProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.todo = {
            userId: '',
            userpassword: '',
            userpassword2: '',
            userpasswordHash: ''
        };
        this.userId = navParams.get('userId');
    }
    FindPassword3Page.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FindPassword3Page');
    };
    FindPassword3Page.prototype.changePassword = function () {
        if (this.todo.userpassword != this.todo.userpassword2) {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: '비밀번호가 서로 맞지 않습니다.',
                buttons: ['확인']
            });
            alert_1.present();
            return;
        }
        else {
            this.todo.userId = this.userId;
            var hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
            this.todo.userpasswordHash = hash;
            console.log(this.todo);
            this.restProvider.chagePassword(this.todo).then(function (data) { }, function (err) {
                console.log(err);
            });
            this.navCtrl.setRoot(HomePage);
        }
    };
    FindPassword3Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-find-password3',
            templateUrl: 'find-password3.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, AlertController])
    ], FindPassword3Page);
    return FindPassword3Page;
}());
export { FindPassword3Page };
//# sourceMappingURL=find-password3.js.map