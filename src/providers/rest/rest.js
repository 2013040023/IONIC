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
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        //apiUrl = 'http://192.168.0.60:8080';
        //apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        //console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.getPhoneCheckNumber = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/phone/check', JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider.prototype.joinUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/join/users', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                //console.log("asdasdasdasdadsasd"+err);
            });
        });
    };
    RestProvider.prototype.checkUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user/check', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestProvider.prototype.chagePassword = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/update/password', JSON.stringify(data))
                .subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestProvider.prototype.loginUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/login/user', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestProvider.prototype.getCeoMember = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/get/member', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                //console.log("asdasdasdads"+err);
            });
        });
    };
    RestProvider.prototype.getUserId = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/select/userId', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                //console.log("asdasdasdads"+err);
            });
        });
    };
    RestProvider.prototype.getPhoneFindNumber = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/phone/find', JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map