import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GisuSelectPage } from '../gisu-select/gisu-select'

/**
 * Generated class for the GisuFindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gisu-find',
  templateUrl: 'gisu-find.html',
})
export class GisuFindPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams,public userProvider: UserProvider) {
  	}

  	Gisues : any;

  	ionViewDidLoad() {

  		this.Gisues = [];
    	//console.log('ionViewDidLoad GisuFindPage');

    	this.userProvider.selectMS().then(
            data => {
            	this.Gisues = data;
                for( var i in data){
                }
            },
            err => {
                console.log(err);
            });


  	}

    gisuSelected(code01 : string, code_nm : string){

            this.navCtrl.push(GisuSelectPage, {
                code01: code01,
                code_nm: code_nm
            });

    }



}
