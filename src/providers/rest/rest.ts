import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

    //apiUrl = 'http://192.168.0.60:8080';
    //apiUrl = 'http://192.168.0.9:8080';
    public apiUrl = 'http://cnode.iptime.org:8200';

  	constructor(public http: HttpClient) {
    	//console.log('Hello RestProvider Provider');
  	}

  	getPhoneCheckNumber(data) {

	  	return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/phone/check', JSON.stringify(data))
	      	 .subscribe(res => {
		        resolve(res);
		      }, (err) => {
		        reject(err);
		      });
	  	});
	}

	joinUser(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/join/users', JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       //console.log("asdasdasdasdadsasd"+err);
		    });
	  	});
	}

	checkUser(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/user/check', JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(data => {
		       resolve(data);
		    }, err => {
		       console.log(err);
		    });
	  	});
	}

	chagePassword(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/update/password', JSON.stringify(data))
	      	.subscribe(res => {
		       console.log(res);
		    }, (err) => {
		       console.log(err);
		    });
	  	});

	}

	loginUser(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/login/user', JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(data => {
		       resolve(data);
		    }, (err) => {
		       console.log(err);
		    });
	  	});

	}

	getCeoMember(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/get/member', JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, (err) => {
		       //console.log("asdasdasdads"+err);
		    });
	  	});
	}

	getUserId(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/select/userId', JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, (err) => {
		       //console.log("asdasdasdads"+err);
		    });
	  	});
	}

		getPhoneFindNumber(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/phone/find', JSON.stringify(data))
	      	 .subscribe(res => {
		        resolve(res);
		      }, (err) => {
		        reject(err);
		      });
	  	});

	}
}
