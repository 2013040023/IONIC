import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GisuViewPage } from '../gisu-view/gisu-view';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the CircleSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circle-search',
  templateUrl: 'circle-search.html',
})
export class CircleSearchPage {

	searchUser = {
		userName : '',
		ceoCtg : ''
	}
    users : any;
	showSearch : boolean;

    gisues : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public sanitizer: DomSanitizer,
              public callNumber: CallNumber) {
  }

  	ionViewDidLoad() {
    //console.log('ionViewDidLoad CircleSearchPage');
    this.users = [];
    this.gisues = [];

        this.userProvider.userSelect(this.searchUser).then(
            data => {
                //console.log(data);
                this.users = data;
                for(var i in data){

                    if(data[i].CEO_HDP_NO01 != undefined){
                    this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                }
                    if(data[i].CEO_IMG == undefined){
                    this.users[i].CEO_IMG = "assets/imgs/nonImg.png"
                }
                     this.users[i].CEO_ORDER = data[i].CEO_ORDER.substr(2,4) + "기";
              }
                
            },
            err => {
                console.log(err);
            });
  	}

  	clickSearch(){

  		
  		if(this.showSearch){
  			this.showSearch = false;
  		}
  		else{
  			this.showSearch = true;
  		}
  		
  	}

      clickSearchUser(){

            this.userProvider.userSelect(this.searchUser).then(
            data => {
                //console.log(data);
                this.users = data;
                for(var i in data){
                    if(data[i].CEO_HDP_NO01 != undefined){
                    this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
                }
                    if(data[i].CEO_IMG == undefined){
                    this.users[i].CEO_IMG = "assets/imgs/nonImg.png"
                }
                    this.users[i].CEO_ORDER = data[i].CEO_ORDER.substr(2,4) + "기";
              }
                
            },
            err => {
                console.log(err);
            });


        }

    userSelected(ceo_no : string, code_nm : string){

        this.navCtrl.push(GisuViewPage, {
                ceo_no: ceo_no,
                code_nm: code_nm
            });

    }
    sanitize(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    phoneCall(phoneNum:string){
    this.callNumber.callNumber(phoneNum, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }

}
