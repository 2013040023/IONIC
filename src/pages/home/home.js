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
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import CryptoJS from 'crypto-js';
import { RegisterPage } from '../register/register';
import { FindId1Page } from '../find-id1/find-id1';
import { FindPassword1Page } from '../find-password1/find-password1';
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, storage, restProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.todo = {
            userId: '',
            userpassword: '',
            userpasswordHash: ''
        };
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('user_no').then(function (val) {
            console.log(val);
        });
        this.storage.get('autologin').then(function (val) {
            if (val == "1") {
                _this.navCtrl.setRoot(MainPage);
            }
        });
    };
    HomePage.prototype.findID = function () {
        this.navCtrl.push(FindId1Page);
    };
    HomePage.prototype.findPassword = function () {
        this.navCtrl.push(FindPassword1Page);
    };
    HomePage.prototype.registUser = function () {
        this.navCtrl.push(RegisterPage);
    };
    HomePage.prototype.login = function () {
        var _this = this;
        if (this.todo.userId == '' || this.todo.userpassword == '') {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: '아이디와 비밀번호는 반드시 입력되어야 합니다.',
                buttons: ['확인']
            });
            alert_1.present();
        }
        else {
            //console.log(this.autologin);
            var hash = CryptoJS.SHA256(this.todo.userpassword).toString(CryptoJS.enc.Hex);
            this.todo.userpasswordHash = hash;
            this.restProvider.loginUser(this.todo).then(function (data) {
                var checkUser = data["checkUserId"];
                //console.log(checkUser);
                if (checkUser == "true") {
                    var userNo = data["user_no"];
                    var userAuth = data["user_auth"];
                    _this.storage.set('user_no', userNo);
                    _this.storage.set('user_auth', userAuth);
                    if (_this.autologin) {
                        _this.storage.set('autologin', "1");
                    }
                    else {
                        _this.storage.set('autologin', "0");
                    }
                    _this.navCtrl.setRoot(MainPage);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: '',
                        subTitle: '아이디와 비밀번호를 다시 확인해주세요.',
                        buttons: ['확인']
                    });
                    alert_2.present();
                    _this.todo.userpassword = '';
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Storage, RestProvider, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map