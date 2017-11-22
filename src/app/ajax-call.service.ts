import { Injectable } from '@angular/core';
import { DataBlock, Message } from './jsons/DataClasses';

@Injectable()
export class AjaxCallService {
  loggedInUser = false;
  getToken = {
    tokenID: 1000,
    getTokenID: function () {
      return this.tokenID++;
    }
  }


  tempArray: any[] = [];

  constructor() {
    console.log("ok")
    
    this.tempArray.push({
      'username': 'manishekaneja',
      'fullName': 'Manish Aneja',
      'email': 'mani@gmail.com',
      'password': '123123',
      'tokenID': this.getToken.getTokenID(),
      'messages':  [ new Message("Welcome To MessageME", true),
        new Message("Welcome To MessageME 2", false),
        new Message("Welcome To MessageME 33", true),
      ]

    });
    this.tempArray.push({
      'username': 'ma@gmail.com',
      'fullName': 'Mani',
      'email': 'ma@gmail.com',
      'password': '123123123',
      'tokenID': this.getToken.getTokenID(),
      'messages': [ new Message("Welcome To MessageME", true),
      new Message("Welcome To MessageME 2", false),
      new Message("Welcome To MessageME 33", true),
    ]
    });

  }

  preCheck(): void {
    if (localStorage.tokenID) {
      if (this.tempArray.filter(ele => ele.tokenID === localStorage.tokenID)) {
        this.loggedInUser = true;
      }
    }

  }
  getData(token: string): any {
    let data = this.tempArray.filter(ele => {
      if (ele.tokenID == token) {
        return ele;
      }
    });
    if (data.length) {
      return data[0];
    }
    return null;
  }
  doRegister(data: DataBlock): boolean {
    if (data.cpassword === data.password) {
      if (this.tempArray.filter(reg => {
        if (reg.email === data.email) {
          console.log(reg);
          return reg;
        }
      }).length) {
        return false;
      }
      else {
        let obj = new DataBlock(data.email, data.password, data.fullName, data.username, data.cpassword,
          [
            new Message("Welcome To MessageME", true),
            new Message("Welcome To MessageME 2", false)
          ]);
        this.tempArray.push(obj);
        return true;
      }
    }
    else {
      return false;
    }

  }
   
  updateMessage(token:string,mess:Message):void{
    let result=this.tempArray.filter(ele=>{
      if(ele.tokenID==token){
        return ele;
      }
    });
    if(result.length){
      result[0].messages=result[0].messages.filter(message=>{
        if(message===mess){
          // return new Message(message.message,!(message.fav));
        message.fav=!(message.fav);
        }
        // else{
          return message;
        // }
      })
      console.log("Here "+result);
    }
  }
  deleteMessage(token:string,mess:Message){
    let result=this.tempArray.filter(ele=>{
      if(ele.tokenID==token){
        return ele;
      }
    });
    if(result.length){
      result[0].messages=result[0].messages.filter(message=>{
        if(message!==mess){
          return message;
          
        }
      })
      console.log("Here 2 "+JSON.stringify(result[0].messages));
    }
  }



  doLogin(data: DataBlock): boolean {

    let obj = this.tempArray.filter(ele => {
      if (ele.email === data.email) {
        return ele;
      }
    })
    console.log(this.tempArray);
    console.log(obj);
    if (obj.length && obj[0].password === data.password) {
      localStorage.tokenID = obj[0].tokenID;
      this.loggedInUser = true;
      return true;
    }
    else {
      console.log("failed");
      return false;
    }
  }
}



