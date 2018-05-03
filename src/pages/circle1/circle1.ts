import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,AlertController  } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group'
import { Popover1Component } from '../../components/popover1/popover1'
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the Circle1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circle1',
  templateUrl: 'circle1.html',
})
export class Circle1Page {

    groups : any;
    groupModel = {
        groupType : 'WONWOO',
        groupName : '',
        groupNo: '',
        groupMemberNo : '',
        groupMemberName : '',
        groupMemberOrder : '',
        groupMemberHdp : '',
        groupMemberPhone : ''
    }
    
    groupAddPopup = false;
    memberAddPopup = false;
    
    searchUser = {
        userName : '',
        ceoCtg : ''
    }
    users : any;
    AdminAuth = false;
    userAuth = {
        userNo : ''
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(Popover1Component);
            popover.present({
            ev: myEvent
        });
            popover.onDidDismiss(data => {
                //console.log(data);
                if(data == "add"){
                    this.addGroup();
                }
                else if(data == "del"){

                    this.delGroup();
                }else{

                    return;
                }
            })
    }

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public groupProvider : GroupProvider,
                public popoverCtrl: PopoverController,
                public alertCtrl: AlertController,
                public userProvider: UserProvider,
                private storage: Storage,
                public sanitizer: DomSanitizer,
                public callNumber: CallNumber) {
  	}

  	ionViewDidLoad() {
        this.groups = [];
	    //console.log('ionViewDidLoad Circle1Page');
        this.groupProvider.groupSelect(this.groupModel).then(
            data => {
                    this.groups = data;
                    //console.log(this.groups);
                    for(var i in data){
                        if(this.groups[i].AUTH_GROUPS != undefined){

                            this.groups[i]["accordionExpanded"] = false;
                            this.groups[i]["userPlus"] = false;
                            this.groups[i]["caretUp"] = false;
                            this.groups[i]["caretDown"] = true;
                            
                            for(var j in this.groups[i].AUTH_GROUPS){
                                if(this.groups[i].AUTH_GROUPS[j].CEO_IMG == undefined){
                                    this.groups[i].AUTH_GROUPS[j]["CEO_IMG"] = "assets/imgs/nonImg.png";
                                }
                                this.groups[i].AUTH_GROUPS[j].CEO_ORDER = "제" + this.groups[i].AUTH_GROUPS[j].CEO_ORDER.substr(2,4)+"기"; 
                                var phone = this.groups[i].AUTH_GROUPS[j].CEO_HDP_NO01;
                                this.groups[i].AUTH_GROUPS[j].CEO_HDP_NO01 = phone.substr(0,3) + "-" + phone.substr(2,4) + "-" + phone.substr(7)
                            }
                        }
                    }
                },
            err => {
                console.log(err);
            });

        this.storage.get('user_no').then((val) => {
                
            this.userAuth.userNo = val;
            console.log(this.userAuth)
            this.userProvider.userSelect(this.userAuth).then(
                data => {
                    console.log(data);
                    var userAuth = data[0].user_auth;
                    console.log(userAuth);
                    if(userAuth == "A"){

                        this.AdminAuth = true;

                    }else{
                        this.AdminAuth = false;
                    }
                },
                err => {
                    console.log(err);
            });
         });
  	}

    addGroup(){
        //팝업오픈
        this.groupAddPopup = true;
        var popup = document.getElementById("layer1");
        var popHeight = 150;
        var adHeight = (window.innerHeight/2 - popHeight/2)+"px";
        popup.style.marginTop = adHeight;
    }

    delGroup(){

        let alert = this.alertCtrl.create();
        alert.setTitle('그룹목록');

        for(var i in this.groups){
            alert.addInput({
                type: 'radio',
                label: this.groups[i].CEO_AUTH_NM,
                value: this.groups[i].CEO_AUTH_NO
                });
         }

        alert.addButton('취소');
        alert.addButton({
            text: '삭제',
            handler: data => {
            //console.log(data);
            this.groupModel.groupNo = data;
            this.groupProvider.groupDel(this.groupModel).then(
                data => {
                        //console.log(data);
                        this.ionViewDidLoad();
                    },
                err => {
                    console.log(err);
                });

            }
        });
        alert.present();
    }

    popupClose(){
        this.groupAddPopup = false;
        this.memberAddPopup = false;
    }

    addGroups(){
        //this.groups = [];

        if(this.groupModel.groupName == ''){

            let alert = this.alertCtrl.create({
            subTitle: '이름과 소속은 반드시 채워야 합니다.',
            buttons: ['확인']
            });
            alert.present();
        }else{

            this.groupProvider.groupAdd(this.groupModel).then(
            data => {
                    //console.log(data);
                    this.ionViewDidLoad();
                },
            err => {
                console.log(err);
            });
            this.groupAddPopup = false;
        }

          
    }

    addMember( ceoAuthNo : any ){
        this.memberAddPopup = true;
        this.groupModel.groupNo = ceoAuthNo;
        var popup = document.getElementById("layer2");
        //var popWidth = popup.offsetWidth;
        var popHeight = 300;
        var adHeight = (window.innerHeight/2 - popHeight/2)+"px";
        popup.style.marginTop = adHeight;

        this.userProvider.userSelect(this.searchUser).then(
            data => {
                //console.log(data);
                this.users = data;
                for(var i in data){
                     this.users[i].CEO_ORDER = "제"+data[i].CEO_ORDER.substr(2,4) + "기";
                }
            },
            err => {
                console.log(err);
            });
    }

    userSearch(){
        this.userProvider.userSelect(this.searchUser).then(
            data => {
                //console.log(data);
                this.users = data;
                for(var i in data){
                     this.users[i].CEO_ORDER = "제"+data[i].CEO_ORDER.substr(2,4) + "기";
                }
            },
            err => {
                console.log(err);
            });
    }
    userSelected( ceoNo : any){

        this.groupModel.groupMemberNo = ceoNo;
        this.groupProvider.groupMemberAdd(this.groupModel).then(
            data => {
                    //console.log(data);
                    this.memberAddPopup = false;
                    this.ionViewDidLoad();
                },
            err => {
                console.log(err);
            });
    }

    delGroupMember( ceoNo : any ){
        this.groupModel.groupMemberNo = ceoNo;
        let confirm = this.alertCtrl.create({
            message: '해당 맴버를 삭제하시겠습니까?',
            buttons: [
                {
                    text: '아니오',
                    handler: () => {
                    }
                },
            {
                text: '예',
                handler: () => {
                    this.groupProvider.groupMemberDel(this.groupModel).then(
                    data => {
                            //console.log(data);
                            this.ionViewDidLoad();
                        },
                    err => {
                        console.log(err);
                    });
                }
            }
          ]
        });
        confirm.present();
      }  

      sanitize(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    phoneCall(phoneNum:string){
    this.callNumber.callNumber(phoneNum, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }

    toggleAccordion(index : any){

        if(!this.groups[index].accordionExpanded){
            this.groups[index].accordionExpanded = true;
            this.groups[index].userPlus = true;
            this.groups[index].caretUp = true;
            this.groups[index].caretDown = false;
        }else{
            this.groups[index].accordionExpanded = false;
            this.groups[index].userPlus = false;
            this.groups[index].caretUp = false;
            this.groups[index].caretDown = true;
        }
    }
    
}
