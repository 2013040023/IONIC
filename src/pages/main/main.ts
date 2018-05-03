import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NoticePage } from '../notice/notice'
import { SettingPage } from '../setting/setting'
import { BoardProvider } from '../../providers/board/board';
import { UserProvider } from '../../providers/user/user';
import { Circle1Page } from '../circle1/circle1'
import { GisuFindPage } from '../gisu-find/gisu-find'
import { CircleSearchPage } from '../circle-search/circle-search'
import { HospitalInfoPage } from '../hospital-info/hospital-info'
import { NewsPage } from '../news/news'

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	newNotices : any;

    todo = {
        userNo : '',
        boardId : '',
        boardType : 'NT',
        boardTitle : ''
     }

     user = {
        userNo : '',
        ceoOrder : '',
        userName : '',
        ceoCpn : '',
        phoneNum : '',
        ceoCtg : '',
        ceoImg : '',
        ceoOrderNm : ''
     }

	//@ViewChild(Slides) slides: Slides;
	constructor(public navCtrl: NavController, public navParams: NavParams,public boardProvider: BoardProvider,private storage: Storage,public userProvider: UserProvider) {
    }

    ionViewDidLoad() {

    }

    ionViewWillEnter() {
        this.newNotices = [];
        //console.log(this.items);
        //console.log('ionViewDidapper NoticePage');   
        this.boardProvider.viewBoard(this.todo).then(
                data => {
                    var topNoticeDom = document.getElementById("notice").offsetTop;

                    //console.log(window.innerHeight - topNoticeDom);
                    document.getElementById("notice").style.height = (window.innerHeight - topNoticeDom-7)+"px";
                    var noticeHeaderDom = document.getElementById("notice").offsetHeight-45;
                    //console.log(window.innerHeight - topNoticeDom - noticeHeaderDom );
                    var check_height = Math.floor(( noticeHeaderDom ) / 27);
                    console.log(check_height+"checkHeight");
                    for(var i in data){
                        
                        if(Number(i)< check_height){
                            this.newNotices.push(data[i].board_title);
                        }
                    }
                },
                err => {
                    console.log(err);
                });

        this.storage.get('user_no').then((val) => {
                
            this.user.userNo = val;
            //console.log(this.user)
            this.userProvider.userSelect(this.user).then(
                data => {
                    //console.log(data);
                    if(data[0].CEO_IMG == undefined){
                         this.user.ceoImg = "assets/imgs/nonImg.png"
                    }else{
                         this.user.ceoImg = data[0].CEO_IMG;
                    }
                    //console.log(data);data[i].CEO_ORDER.replace(/0/gi, '')+"기수"
                    this.user.ceoOrder = data[0].CEO_ORDER;
                    this.user.userName = data[0].CEO_NM;
                    this.user.ceoCpn = data[0].CEO_CPN;
                    this.user.phoneNum = data[0].CEO_HDP_NO01.substr(0,3) + "-"+data[0].CEO_HDP_NO01.substr(3,4)+ "-"+data[0].CEO_HDP_NO01.substr(7);
                    this.user.ceoCtg = data[0].CEO_CTG;

                    this.gisuSelect();
                },
                err => {
                    console.log(err);
            });
         });
    }

    category() {
        this.navCtrl.push(Circle1Page);
    }

    category1() {
  	    this.navCtrl.push(SettingPage);
    }

    category2() {
  	    this.navCtrl.push(NoticePage);
    }
     category3() {
        this.navCtrl.push(GisuFindPage);
    }
    category4() {
        this.navCtrl.push(CircleSearchPage)
    }
    category5() {
        this.navCtrl.push(HospitalInfoPage)
    }

    category6() {
        this.navCtrl.push(NewsPage)
    }

    gisuSelect(){

        this.userProvider.selectUserGisu(this.user).then(
                data => {
                    this.user.ceoOrderNm = data["code_nm"];
                },
                err => {
                    console.log(err);
            });
    }
}
