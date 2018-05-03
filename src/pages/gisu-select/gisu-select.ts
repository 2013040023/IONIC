import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GisuViewPage } from '../gisu-view/gisu-view';
import { CallNumber } from '@ionic-native/call-number';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the GisuSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gisu-select',
  templateUrl: 'gisu-select.html',
})
export class GisuSelectPage {

  	constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public userProvider: UserProvider,
                public sanitizer: DomSanitizer,
                public callNumber: CallNumber) {
  		this.gisu.code01 = navParams.get('code01');
        this.gisu.code_nm  = navParams.get('code_nm');
  	}

  	gisu = {
  		code01 : '',
  		code_nm : ''
  	}

  	users : any;
  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad GisuSelectPage');

    	this.users = [];

    	this.userProvider.userSelect(this.gisu).then(
            data => {
            	console.log(data);
            	this.users = data;
            	for(var i in data){

            		if(data[i].CEO_HDP_NO01 != undefined){
            			this.users[i]["phone_num_fix"] = data[i].CEO_HDP_NO01.substr(0, 3) + "-" + data[i].CEO_HDP_NO01.substr(3, 4) + "-" + data[i].CEO_HDP_NO01.substr(7);
            		}
            		if(data[i].CEO_IMG == undefined){
            			this.users[i].CEO_IMG = "assets/imgs/nonImg.png"
            		}
            	}
                
            },
            err => {
                console.log(err);
            });
  	}

    userSelected(ceo_no : string){

        this.navCtrl.push(GisuViewPage, {
                ceo_no: ceo_no,
                code_nm: this.gisu.code_nm
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
