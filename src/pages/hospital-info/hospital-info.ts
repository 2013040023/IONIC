import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,AlertController,ModalController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';
import { Popover1Component } from '../../components/popover1/popover1';
import { Popup1Page } from '../popup1/popup1'
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the HospitalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-info',
  templateUrl: 'hospital-info.html'
})
export class HospitalInfoPage {

	accordionExpanded = false;
	groupAddPopup = false;
    memberAddPopup = false;
	groups : any;

    AdminAuth = false;
    userAuth = {
        userNo : ''
    }

	groupModel = {
		groupName : '',
        GroupNo: '',
        groupMemberName : '',
        groupMemberPhone : '',
        groupMemberEmail : '',
        groupMemberSpot : '',
        buttonText : '',
        buttonCode : '',
        hsptGroupMemberNo : '',
        groupMemberImg : ''
	}

    constructor(public navCtrl: NavController,
    			public navParams: NavParams,
    			public groupProvider : GroupProvider,
    			public popoverCtrl: PopoverController,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public userProvider: UserProvider,
                private storage: Storage,
                public sanitizer: DomSanitizer,
                public callNumber: CallNumber ) {
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

	ionViewDidLoad() {
  	    //console.log('ionViewDidLoad HospitalInfoPage');
        this.groups = [];
        //모델 초기화
        this.groupModel.groupMemberEmail = '';
        this.groupModel.groupMemberName = '';
        this.groupModel.groupMemberPhone = '';
        this.groupModel.groupMemberSpot = '';
        this.groupModel.groupName = '';
        this.groupModel.GroupNo = '';

        this.groupProvider.groupSelect(this.groupModel).then(
            data => {
                    this.groups = data;
                    //console.log(data);
                    for(var i in data){
                        this.groups[i]["accordionExpanded"] = false;
                        this.groups[i]["userPlus"] = false;
                        this.groups[i]["caretUp"] = false;
                        this.groups[i]["caretDown"] = true;

                        for(var j in this.groups[i].HSPT_GROUPS){

                            //console.log(this.groups[i]);
                            
                            if(this.groups[i].HSPT_GROUPS[j].HSPT_MEMBER_IMG == undefined){
                                this.groups[i].HSPT_GROUPS[j].HSPT_MEMBER_IMG = "assets/imgs/nonImg.png"
                            }
                            
                            if(this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01 != undefined){
                                this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01=this.chInputNumber(this.groups[i].HSPT_GROUPS[j].HSPT_HDP_NO01);
                            }
                        }
                    }
                    //console.log(this.groups);
                },
            err => {
                console.log(err);
            });

        this.storage.get('user_no').then((val) => {
                
            this.userAuth.userNo = val;
            //console.log(this.userAuth)
            this.userProvider.userSelect(this.userAuth).then(
                data => {
                    //console.log(data);
                    var userAuth = data[0].user_auth;
                    //console.log(userAuth);
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
    	//var popWidth = popup.offsetWidth;
    	var popHeight = 150;
    	//console.log(popHeight);
    	//console.log(window.innerHeight);
    	var adHeight = (window.innerHeight/2 - popHeight/2)+"px";
    	popup.style.marginTop = adHeight;
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

    delGroup(){
        let alert = this.alertCtrl.create();
        alert.setTitle('그룹목록');

        for(var i in this.groups){
            alert.addInput({
                type: 'radio',
                label: this.groups[i].HSPT_GROUP_NM,
                value: this.groups[i].HSPT_GROUP_NO
                });
         }

        alert.addButton('취소');
        alert.addButton({
            text: '삭제',
            handler: data => {
            //console.log(data);
            this.groupModel.GroupNo = data;
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
                //모델 초기화
        this.groupModel.groupMemberEmail = '';
        this.groupModel.groupMemberName = '';
        this.groupModel.groupMemberPhone = '';
        this.groupModel.groupMemberSpot = '';
        this.groupModel.groupName = '';
        this.groupModel.GroupNo = '';

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
    addMember(hsptGroupNo : any, hsptGroupNm : any){

        //this.memberAddPopup = true;
        //팝업오픈
        let profileModal = this.modalCtrl.create(Popup1Page, { 
            hsptGroupNo: hsptGroupNo,
            hsptGroupNm: hsptGroupNm,
            buttonText : "추가",
            buttonCode : "AD"
        });
        profileModal.onDidDismiss(data => {
            //console.log(data);
            if(data["status"] == "change"){
                this.ionViewDidLoad();
            }
        });
        profileModal.present();
        

        this.groupModel.groupName = hsptGroupNm;
        this.groupModel.GroupNo = hsptGroupNo;
        this.groupModel.buttonText = "추가",
        this.groupModel.buttonCode = "AD"
    }


    updateGroupMember(hsptGroupMemberNo: any,hsptGroupNo : any,hsptGroupNm : any,hsptNm : any, hsptSpot: any,hsptHdpNo01 : any,hsptEmail:any,hsptMemberImg:any){


        let profileModal = this.modalCtrl.create(Popup1Page, { 
                hsptGroupNo: hsptGroupNo,
                hsptGroupNm: hsptGroupNm,
                buttonText : "변경",
                buttonCode : "CH",
                hsptGroupMemberNo : hsptGroupMemberNo,
                groupMemberName : hsptNm,
                groupMemberSpot : hsptSpot,
                groupMemberPhone : hsptHdpNo01,
                groupMemberEmail : hsptEmail,
                groupMemberImg : hsptMemberImg
        });
        profileModal.onDidDismiss(data => {
            //console.log(data);
            if(data["status"] == "change"){
                this.ionViewDidLoad();
            }
            //this.ionViewDidLoad()
        });
        profileModal.present();

        this.groupModel.hsptGroupMemberNo = hsptGroupMemberNo;
        this.groupModel.groupName = hsptGroupNm;
        this.groupModel.GroupNo = hsptGroupNo;
        this.groupModel.groupMemberName = hsptNm;
        this.groupModel.groupMemberSpot = hsptSpot;
        this.groupModel.groupMemberPhone = hsptHdpNo01;
        this.groupModel.groupMemberEmail = hsptEmail;
        this.groupModel.groupMemberImg = hsptMemberImg;
        this.groupModel.buttonText = "변경",
        this.groupModel.buttonCode = "CH"
        //console.log(this.groupModel);
    }

    delGroupMember(hsptGroupMemberNo: any){

        this.groupModel.hsptGroupMemberNo = hsptGroupMemberNo;
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
                            this.memberAddPopup = false;
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

    chInputNumber(data : string){
        if(data.substr(0, 2)=="02"){
            if(data.length==9){
                data = data.substr(0,2) + "-" +data.substr(2,3)+ "-" + data.substr(5,4);
            }
            else{
                data = data.substr(0,2) + "-" +data.substr(2,4)+ "-" + data.substr(6,4);
            }
        }else{
            if(data.substr(0, 1)=="0"){
                if(data.length==10){
                    data = data.substr(0,3) + "-" +data.substr(3,3)+ "-" + data.substr(6,4);
                }
                else{
                    data = data.substr(0,3) + "-" +data.substr(3,4)+ "-" + data.substr(7,4);
                }
            }else{

                data = data;
            }
        }
        return data;
    }
}
