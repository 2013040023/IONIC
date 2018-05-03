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
import { GisuViewPage } from '../gisu-view/gisu-view';
import { CallNumber } from '@ionic-native/call-number';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the GisuSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GisuSelectPage = /** @class */ (function () {
    function GisuSelectPage(navCtrl, navParams, userProvider, sanitizer, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.sanitizer = sanitizer;
        this.callNumber = callNumber;
        this.gisu = {
            code01: '',
            code_nm: ''
        };
        this.gisu.code01 = navParams.get('code01');
        this.gisu.code_nm = navParams.get('code_nm');
    }
    GisuSelectPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad GisuSelectPage');
        var _this = this;
        this.users = [];
        this.userProvider.userSelect(this.gisu).then(function (data) {
            console.log(data);
            _this.users = data;
            for (var i in data) {
                if (data[i].CEO_HDP_NO01 != undefined) {
                    _this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                }
                if (data[i].CEO_IMG == undefined) {
                    _this.users[i].CEO_IMG = "assets/imgs/nonImg.png";
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    GisuSelectPage.prototype.userSelected = function (ceo_no) {
        this.navCtrl.push(GisuViewPage, {
            ceo_no: ceo_no,
            code_nm: this.gisu.code_nm
        });
    };
    GisuSelectPage.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    GisuSelectPage.prototype.phoneCall = function (phoneNum) {
        this.callNumber.callNumber(phoneNum, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    GisuSelectPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-gisu-select',
            templateUrl: 'gisu-select.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            UserProvider,
            DomSanitizer,
            CallNumber])
    ], GisuSelectPage);
    return GisuSelectPage;
}());
export { GisuSelectPage };
//# sourceMappingURL=gisu-select.js.map