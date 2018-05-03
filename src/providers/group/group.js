var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GroupProvider = /** @class */ (function () {
    function GroupProvider(http) {
        this.http = http;
        //apiUrl = 'http://192.168.0.60:8080';
        //apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        //console.log('Hello GroupProvider Provider');
    }
    GroupProvider.prototype.groupSelect = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/group/select', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    GroupProvider.prototype.groupAdd = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/group/insert', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    GroupProvider.prototype.groupDel = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/group/delete', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    GroupProvider.prototype.groupMemberAdd = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/member/insert', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    GroupProvider.prototype.groupMemberDel = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/member/delete', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    GroupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], GroupProvider);
    return GroupProvider;
}());
export { GroupProvider };
//# sourceMappingURL=group.js.map