var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPassword2Page } from './find-password2';
var FindPassword2PageModule = /** @class */ (function () {
    function FindPassword2PageModule() {
    }
    FindPassword2PageModule = __decorate([
        NgModule({
            declarations: [
                FindPassword2Page,
            ],
            imports: [
                IonicPageModule.forChild(FindPassword2Page),
            ],
        })
    ], FindPassword2PageModule);
    return FindPassword2PageModule;
}());
export { FindPassword2PageModule };
//# sourceMappingURL=find-password2.module.js.map