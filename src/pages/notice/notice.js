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
import { AddNoticePage } from '../add-notice/add-notice';
import { BoardProvider } from '../../providers/board/board';
import { DetailNoticePage } from '../detail-notice/detail-notice';
/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NoticePage = /** @class */ (function () {
    function NoticePage(navCtrl, navParams, boardProvider) {
        //this.initializeItems();
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.boardProvider = boardProvider;
        this.offset = 100;
        this.todo = {
            userId: '',
            boardId: '',
            boardType: 'NT',
            boardTitle: ''
        };
    }
    NoticePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad NoticePage');
    };
    NoticePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.items = [];
        //console.log(this.items);
        //console.log('ionViewDidapper NoticePage');   
        this.boardProvider.viewBoard(this.todo).then(function (data) {
            //console.log("pass");
            for (var i in data) {
                _this.items.push(data[i]);
            }
        }, function (err) {
            console.log(err);
        });
    };
    //검색할때
    NoticePage.prototype.getItems = function (ev) {
        var _this = this;
        // Reset items back to all of the items
        this.todo.boardTitle = '';
        this.ionViewWillEnter();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.todo.boardTitle = val.toLowerCase();
            this.boardProvider.viewBoard(this.todo).then(function (data) {
                _this.items = [];
                //console.log("pass");
                for (var i in data) {
                    _this.items.push(data[i]);
                }
                //console.log(this.items)
            }, function (err) {
                console.log(err);
            });
        }
    };
    NoticePage.prototype.addNotice = function () {
        this.navCtrl.push(AddNoticePage);
    };
    NoticePage.prototype.detailBoard = function (data, data2) {
        //console.log(data2);
        this.navCtrl.push(DetailNoticePage, {
            boardId: data,
            userNo: data2
        });
    };
    NoticePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notice',
            templateUrl: 'notice.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BoardProvider])
    ], NoticePage);
    return NoticePage;
}());
export { NoticePage };
//# sourceMappingURL=notice.js.map