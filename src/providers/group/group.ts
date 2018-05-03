import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupProvider {

	//apiUrl = 'http://192.168.0.60:8080';
	//apiUrl = 'http://192.168.0.9:8080';
	public apiUrl = 'http://cnode.iptime.org:8200';
  	constructor(public http: HttpClient) {
    	//console.log('Hello GroupProvider Provider');
  	}

  	groupSelect(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/group/select',JSON.stringify(data),
	    	{
	    		headers: {'Content-Type': 'application/json'}
	    	})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});
	}

	groupAdd(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/group/insert',JSON.stringify(data),
	    	{
	    		headers: {'Content-Type': 'application/json'}
	    	})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});
	}

	groupDel(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/group/delete',JSON.stringify(data),
	    	{
	    		headers: {'Content-Type': 'application/json'}
	    	})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});

	}

	groupMemberAdd(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/member/insert',JSON.stringify(data),
	    	{
	    		headers: {'Content-Type': 'application/json'}
	    	})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});
	}

	groupMemberDel(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/member/delete',JSON.stringify(data),
	    	{
	    		headers: {'Content-Type': 'application/json'}
	    	})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});
	}
}
