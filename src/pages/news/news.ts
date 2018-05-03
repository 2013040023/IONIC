import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddNoticePage } from '../add-notice/add-notice'
import { BoardProvider } from '../../providers/board/board';
import { DetailNoticePage } from '../detail-notice/detail-notice'
/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
	
 	public items : Array<any>;
	offset = 100;
     todo = {
        userId : '',
        boardId : '',
        boardType : 'FR',
        boardTitle : ''
     }

	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public boardProvider: BoardProvider
                ) {
	  	//this.initializeItems();

	}

  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad NoticePage');
  	}

    ionViewWillEnter() {
        this.items = [];
        //console.log(this.items);
        //console.log('ionViewDidapper NoticePage');   
        this.boardProvider.viewBoard(this.todo).then(
                data => {
                    //console.log(data);
                    for(var i in data){
                        this.items.push(data[i]);
                    }
                },
                err => {
                    console.log(err);
                });
    }

    //검색할때
	getItems(ev: any) {
    // Reset items back to all of the items
    this.todo.boardTitle = ''
    this.ionViewWillEnter();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

        this.todo.boardTitle = val.toLowerCase();
	    this.boardProvider.viewBoard(this.todo).then(
            data => {
                 this.items = [];
                //console.log("pass");
                for(var i in data){
                        this.items.push(data[i]);
                    }
                //console.log(this.items)
            },
            err => {
                console.log(err);
            });
		}
  	}

  	addNotice() {
  		this.navCtrl.push(AddNoticePage,{

              boardType:'FR'
          });
  	}

    detailBoard(data : string,data2 : Number) {
        //console.log(data);
        this.navCtrl.push(DetailNoticePage, {
            boardId: data,
            userNo: data2
        });
    }

}

