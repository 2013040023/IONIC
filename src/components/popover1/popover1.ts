import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
/**
 * Generated class for the Popover1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover1',
  templateUrl: 'popover1.html'
})
export class Popover1Component {

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

  	addGroups(){
  		this.dismiss("add");
  	}
  	delGroups(){
  		this.dismiss("del");
  	}

}
