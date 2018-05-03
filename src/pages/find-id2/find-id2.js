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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FindPassword2Page } from '../find-password2/find-password2';
/**
 * Generated class for the FindId2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FindId2Page = /** @class */ (function () {
    function FindId2Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userId = navParams.get('userId');
    }
    FindId2Page.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FindId2Page');
    };
    FindId2Page.prototype.confirm = function () {
        this.navCtrl.setRoot(HomePage);
    };
    FindId2Page.prototype.findPassword = function () {
        this.navCtrl.push(FindPassword2Page, {
            userId: this.userId
        });
    };
    FindId2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-find-id2',
            templateUrl: 'find-id2.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], FindId2Page);
    return FindId2Page;
}());
export { FindId2Page };
//# sourceMappingURL=find-id2.js.map