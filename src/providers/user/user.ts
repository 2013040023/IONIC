import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

	//apiUrl = 'http://192.168.0.60:8080';
	//apiUrl = 'http://192.168.0.9:8080';
	public apiUrl = 'http://cnode.iptime.org:8200';
	
	constructor(public http: HttpClient) {
   		//console.log('Hello UserProvider Provider');
  	}

  	userSelect(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/user/select',JSON.stringify(data),
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


	authSelect(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/auth/select',JSON.stringify(data),
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

	authUpdate(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/auth/update',JSON.stringify(data),
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

	userDelete(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/user/delete',JSON.stringify(data),
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

	userImgDelete(data){

		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/user/imgDelete',JSON.stringify(data),
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

	updateUserInfo(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/user/updateInfo',JSON.stringify(data),
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

	selectMS(){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/select/ms','',{})
	      	.subscribe(data => {
		        resolve(data);
		    }, err => {
		        console.log(err);
		    });
	  	});
	}

	selectUserGisu(data){
		return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/select/UserGisu',JSON.stringify(data),
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

	insertComment(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/insert/comment',JSON.stringify(data),
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

	memoSelect(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/select/memo',JSON.stringify(data),
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

	updateComment(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/update/comment',JSON.stringify(data),
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
