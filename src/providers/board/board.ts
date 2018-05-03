import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the BoardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BoardProvider {

	//apiUrl = 'http://192.168.0.60:8080';
	//apiUrl = 'http://192.168.0.9:8080';
	public apiUrl = 'http://cnode.iptime.org:8200';

  constructor(public http: HttpClient) {
    //console.log('Hello BoardProvider Provider');
  }

  	uploadBoard(data){
 
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/board/upload', JSON.stringify(data))
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       resolve(err);
		    });
	  	});
	}

	viewBoard(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/board/select',JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       console.log(err);
		    });
	  	});
	}

	delBoard(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/board/delete',JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       console.log(err);
		    });
	  	});
	}

	leaveComment(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/comment/insert',JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       console.log(err);
		    });
	  	});

	}

	viewReply(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/comment/select',JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       console.log(err);
		    });
	  	});

	}

	deleteComment(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/comment/delete',JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
	      	.subscribe(res => {
		       resolve(res);
		    }, err => {
		       console.log(err);
		    });
	  	});

	}

}
