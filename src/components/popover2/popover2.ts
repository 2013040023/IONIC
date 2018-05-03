import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
/**
 * Generated class for the Popover2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover2',
  templateUrl: 'popover2.html'
})
export class Popover2Component {

  text: string;

constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController) {
  	}

  	dismiss(item) {
	    let data = item;
	    this.viewCtrl.dismiss(data);
	    data ='';
  	}

  	editBoard(){
  		this.dismiss("edit");
  	}
  	delBoard(){
  		this.dismiss("del");
  	}

}
