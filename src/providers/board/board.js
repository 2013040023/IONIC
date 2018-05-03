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
  Generated class for the BoardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BoardProvider = /** @class */ (function () {
    function BoardProvider(http) {
        this.http = http;
        //apiUrl = 'http://192.168.0.60:8080';
        //apiUrl = 'http://192.168.0.9:8080';
        this.apiUrl = 'http://cnode.iptime.org:8200';
        //console.log('Hello BoardProvider Provider');
    }
    BoardProvider.prototype.uploadBoard = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/board/upload', JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    BoardProvider.prototype.viewBoard = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/board/select', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    BoardProvider.prototype.delBoard = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/board/delete', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    BoardProvider.prototype.leaveComment = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/comment/insert', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    BoardProvider.prototype.viewReply = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/comment/select', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    BoardProvider.prototype.deleteComment = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/comment/delete', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
            });
        });
    };
    BoardProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], BoardProvider);
    return BoardProvider;
}());
export { BoardProvider };
//# sourceMappingURL=board.js.map