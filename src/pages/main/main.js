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
import { Storage } from '@ionic/storage';
import { NoticePage } from '../notice/notice';
import { SettingPage } from '../setting/setting';
import { BoardProvider } from '../../providers/board/board';
import { UserProvider } from '../../providers/user/user';
import { Circle1Page } from '../circle1/circle1';
import { GisuFindPage } from '../gisu-find/gisu-find';
import { CircleSearchPage } from '../circle-search/circle-search';
import { HospitalInfoPage } from '../hospital-info/hospital-info';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MainPage = /** @class */ (function () {
    //@ViewChild(Slides) slides: Slides;
    function MainPage(navCtrl, navParams, boardProvider, storage, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.boardProvider = boardProvider;
        this.storage = storage;
        this.userProvider = userProvider;
        this.todo = {
            userNo: '',
            boardId: '',
            boardType: 'NT',
            boardTitle: ''
        };
        this.user = {
            userNo: '',
            ceoOrder: '',
            userName: '',
            ceoCpn: '',
            phoneNum: '',
            ceoCtg: '',
            ceoImg: '',
            ceoOrderNm: ''
        };
    }
    MainPage.prototype.ionViewDidLoad = function () {
    };
    MainPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.newNotices = [];
        //console.log(this.items);
        //console.log('ionViewDidapper NoticePage');   
        this.boardProvider.viewBoard(this.todo).then(function (data) {
            var topNoticeDom = document.getElementById("notice").offsetTop;
            console.log(window.innerHeight - topNoticeDom);
            document.getElementById("notice").style.height = (window.innerHeight - topNoticeDom - 7) + "px";
            var noticeHeaderDom = document.getElementById("notice").offsetHeight;
            //console.log(window.innerHeight - topNoticeDom - noticeHeaderDom );
            var check_height = Math.floor((noticeHeaderDom) / 27);
            //console.log(check_height);
            for (var i in data) {
                if (Number(i) < check_height) {
                    _this.newNotices.push(data[i].board_title);
                }
            }
        }, function (err) {
            console.log(err);
        });
        this.storage.get('user_no').then(function (val) {
            _this.user.userNo = val;
            //console.log(this.user)
            _this.userProvider.userSelect(_this.user).then(function (data) {
                //console.log(data);
                if (data[0].CEO_IMG == undefined) {
                    _this.user.ceoImg = "assets/imgs/nonImg.png";
                }
                else {
                    _this.user.ceoImg = data[0].CEO_IMG;
                }
                //console.log(data);data[i].CEO_ORDER.replace(/0/gi, '')+"기수"
                _this.user.ceoOrder = data[0].CEO_ORDER;
                _this.user.userName = data[0].CEO_NM;
                _this.user.ceoCpn = data[0].CEO_CPN;
                _this.user.phoneNum = data[0].CEO_HDP_NO01.substr(0, 3) + "-" + data[0].CEO_HDP_NO01.substr(3, 4) + "-" + data[0].CEO_HDP_NO01.substr(7);
                _this.user.ceoCtg = data[0].CEO_CTG;
                _this.gisuSelect();
            }, function (err) {
                console.log(err);
            });
        });
    };
    MainPage.prototype.category = function () {
        this.navCtrl.push(Circle1Page);
    };
    MainPage.prototype.category1 = function () {
        this.navCtrl.push(SettingPage);
    };
    MainPage.prototype.category2 = function () {
        this.navCtrl.push(NoticePage);
    };
    MainPage.prototype.category3 = function () {
        this.navCtrl.push(GisuFindPage);
    };
    MainPage.prototype.category4 = function () {
        this.navCtrl.push(CircleSearchPage);
    };
    MainPage.prototype.category5 = function () {
        this.navCtrl.push(HospitalInfoPage);
    };
    MainPage.prototype.gisuSelect = function () {
        var _this = this;
        this.userProvider.selectUserGisu(this.user).then(function (data) {
            _this.user.ceoOrderNm = data["code_nm"];
        }, function (err) {
            console.log(err);
        });
    };
    MainPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-main',
            templateUrl: 'main.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, BoardProvider, Storage, UserProvider])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.js.map