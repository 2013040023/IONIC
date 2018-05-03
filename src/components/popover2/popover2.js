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
import { NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the Popover2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var Popover2Component = /** @class */ (function () {
    function Popover2Component(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    Popover2Component.prototype.dismiss = function (item) {
        var data = item;
        this.viewCtrl.dismiss(data);
        data = '';
    };
    Popover2Component.prototype.editBoard = function () {
        this.dismiss("edit");
    };
    Popover2Component.prototype.delBoard = function () {
        this.dismiss("del");
    };
    Popover2Component = __decorate([
        Component({
            selector: 'popover2',
            templateUrl: 'popover2.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController])
    ], Popover2Component);
    return Popover2Component;
}());
export { Popover2Component };
//# sourceMappingURL=popover2.js.map