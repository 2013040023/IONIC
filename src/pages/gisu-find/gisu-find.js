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
import { UserProvider } from '../../providers/user/user';
import { GisuSelectPage } from '../gisu-select/gisu-select';
/**
 * Generated class for the GisuFindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GisuFindPage = /** @class */ (function () {
    function GisuFindPage(navCtrl, navParams, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
    }
    GisuFindPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.Gisues = [];
        //console.log('ionViewDidLoad GisuFindPage');
        this.userProvider.selectMS().then(function (data) {
            _this.Gisues = data;
            for (var i in data) {
            }
        }, function (err) {
            console.log(err);
        });
    };
    GisuFindPage.prototype.gisuSelected = function (code01, code_nm) {
        this.navCtrl.push(GisuSelectPage, {
            code01: code01,
            code_nm: code_nm
        });
    };
    GisuFindPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-gisu-find',
            templateUrl: 'gisu-find.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserProvider])
    ], GisuFindPage);
    return GisuFindPage;
}());
export { GisuFindPage };
//# sourceMappingURL=gisu-find.js.map