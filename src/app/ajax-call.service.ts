import { Injectable } from '@angular/core';
import { Login } from './jsons/LoginClass';
import { Register } from './jsons/RegisterClass';

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
      'tokenID': this.getToken.getTokenID()
    });
    this.tempArray.push({
      'username': 'ma@gmail.com',
      'fullName': 'Mani',
      'email': 'ma@gmail.com',
      'password': '123123123',
      'tokenID': this.getToken.getTokenID()
    });

  }

  // private readJson(x: string, y: string): string {
  //   return `
  //   {"valid":"true",
  //   "tokenID":123123123
  //   }`;

  // }

  preCheck(): void {
    if (localStorage.tokenID) {
      if (this.tempArray.filter(ele => ele.tokenID === localStorage.tokenID)) {
        console.log("yess");
        this.loggedInUser = true;
      }
    }

  }
  doRegister(data: Register): boolean {
    if(data.cpassword===data.password){
    if (this.tempArray.filter(reg => {
      if (reg.email === data.email) {
        console.log(reg);
        return reg;
      }
    }).length) {
      return false;
    }
    else {
      let obj = {
        'username': data.username,
        'fullName': data.fullName,
        'email': data.email,
        'password': data.password,
        'tokenID': this.getToken.getTokenID()
      };
      localStorage.tokenID = obj.tokenID;
      this.loggedInUser = true;
      this.tempArray.push(obj);
      return true;
    }
  }
  else{
    return false;
  }

  }
  doLogin(data: Login): boolean {
    // var res: any = JSON.parse(this.readJson(data.username, data.password));
    // if (res.valid) {
    // localStorage.tokenID = res.tokenID;
    // this.loggedInUser = true;
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



