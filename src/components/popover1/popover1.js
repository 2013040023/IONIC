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
 * Generated class for the Popover1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var Popover1Component = /** @class */ (function () {
    function Popover1Component(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    Popover1Component.prototype.dismiss = function (item) {
        var data = item;
        this.viewCtrl.dismiss(data);
        data = '';
    };
    Popover1Component.prototype.addGroups = function () {
        this.dismiss("add");
    };
    Popover1Component.prototype.delGroups = function () {
        this.dismiss("del");
    };
    Popover1Component = __decorate([
        Component({
            selector: 'popover1',
            templateUrl: 'popover1.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController])
    ], Popover1Component);
    return Popover1Component;
}());
export { Popover1Component };
//# sourceMappingURL=popover1.js.map