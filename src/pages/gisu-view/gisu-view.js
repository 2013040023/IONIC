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
import { MainPage } from '../main/main';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the GisuViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GisuViewPage = /** @class */ (function () {
    function GisuViewPage(navCtrl, navParams, userProvider, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.callNumber = callNumber;
        this.user = {
            ceoNo: '',
            ceoImg: '',
            ceoOrder: '',
            userName: '',
            phoneNum: '',
            ceoEmail: '',
            ceoCpn: '',
            ceoCtg: '',
            ceoSpot: '',
            ceoCpnNo: '',
            ceoFaxNo: '',
            ceoRtAddr: '',
            code_nm: ''
        };
        this.user.ceoNo = navParams.get('ceo_no');
        this.user.code_nm = navParams.get('code_nm');
    }
    GisuViewPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad GisuViewPage');
        var _this = this;
        this.userProvider.userSelect(this.user).then(function (data) {
            //console.log(data);
            if (data[0].CEO_IMG == undefined) {
                _this.user.ceoImg = "assets/imgs/nonImg.png";
            }
            else {
                _this.user.ceoImg = data[0].CEO_IMG;
            }
            _this.user.ceoOrder = "(" + data[0].CEO_ORDER.substr(2, 4) + "기)";
            _this.user.phoneNum = data[0].CEO_HDP_NO01.substr(0, 3) + "-" + data[0].CEO_HDP_NO01.substr(3, 4) + "-" + data[0].CEO_HDP_NO01.substr(7);
            _this.user.userName = data[0].CEO_NM;
            _this.user.ceoEmail = data[0].CEO_EMIL;
            _this.user.ceoCpn = data[0].CEO_CPN;
            _this.user.ceoCtg = data[0].CEO_CTG;
            _this.user.ceoSpot = data[0].CEO_SPOT;
            _this.user.ceoCpnNo = data[0].CEO_CPN_NO01;
            _this.user.ceoFaxNo = data[0].CEO_FAX_NO01;
            _this.user.ceoRtAddr = data[0].CEO_RT_ADDR;
        }, function (err) {
            console.log(err);
        });
    };
    GisuViewPage.prototype.clickMain = function () {
        this.navCtrl.setRoot(MainPage);
    };
    GisuViewPage.prototype.phoneCall = function (phoneNum) {
        this.callNumber.callNumber(phoneNum, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    GisuViewPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-gisu-view',
            templateUrl: 'gisu-view.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserProvider, CallNumber])
    ], GisuViewPage);
    return GisuViewPage;
}());
export { GisuViewPage };
//# sourceMappingURL=gisu-view.js.map