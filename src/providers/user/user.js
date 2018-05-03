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
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserProvider = /** @class */ (function () {
    function UserProvider(http) {
        this.http = http;
        //apiUrl = 'http://192.168.0.60:8080';
        //apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        //console.log('Hello UserProvider Provider');
    }
    UserProvider.prototype.userSelect = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user/select', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.authSelect = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/auth/select', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.authUpdate = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/auth/update', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.userDelete = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user/delete', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.userImgDelete = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user/imgDelete', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.updateUserInfo = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user/updateInfo', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.selectMS = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/select/ms', '', {})
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider.prototype.selectUserGisu = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/select/UserGisu', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], UserProvider);
    return UserProvider;
}());
export { UserProvider };
//# sourceMappingURL=user.js.map