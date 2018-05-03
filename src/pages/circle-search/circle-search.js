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
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the CircleSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CircleSearchPage = /** @class */ (function () {
    function CircleSearchPage(navCtrl, navParams, userProvider, sanitizer, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.sanitizer = sanitizer;
        this.callNumber = callNumber;
        this.searchUser = {
            userName: '',
            ceoCtg: ''
        };
    }
    CircleSearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //console.log('ionViewDidLoad CircleSearchPage');
        this.users = [];
        this.gisues = [];
        this.userProvider.userSelect(this.searchUser).then(function (data) {
            //console.log(data);
            _this.users = data;
            for (var i in data) {
                if (data[i].CEO_HDP_NO01 != undefined) {
                    _this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                }
                if (data[i].CEO_IMG == undefined) {
                    _this.users[i].CEO_IMG = "assets/imgs/nonImg.png";
                }
                _this.users[i].CEO_ORDER = data[i].CEO_ORDER.substr(2, 4) + "기";
            }
        }, function (err) {
            console.log(err);
        });
    };
    CircleSearchPage.prototype.clickSearch = function () {
        if (this.showSearch) {
            this.showSearch = false;
        }
        else {
            this.showSearch = true;
        }
    };
    CircleSearchPage.prototype.clickSearchUser = function () {
        var _this = this;
        this.userProvider.userSelect(this.searchUser).then(function (data) {
            //console.log(data);
            _this.users = data;
            for (var i in data) {
                if (data[i].CEO_HDP_NO01 != undefined) {
                    _this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                }
                if (data[i].CEO_IMG == undefined) {
                    _this.users[i].CEO_IMG = "assets/imgs/nonImg.png";
                }
                _this.users[i].CEO_ORDER = data[i].CEO_ORDER.substr(2, 4) + "기";
            }
        }, function (err) {
            console.log(err);
        });
    };
    CircleSearchPage.prototype.userSelected = function (ceo_no, code_nm) {
        this.navCtrl.push(GisuViewPage, {
            ceo_no: ceo_no,
            code_nm: code_nm
        });
    };
    CircleSearchPage.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    CircleSearchPage.prototype.phoneCall = function (phoneNum) {
        this.callNumber.callNumber(phoneNum, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    CircleSearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-circle-search',
            templateUrl: 'circle-search.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            UserProvider,
            DomSanitizer,
            CallNumber])
    ], CircleSearchPage);
    return CircleSearchPage;
}());
export { CircleSearchPage };
//# sourceMappingURL=circle-search.js.map