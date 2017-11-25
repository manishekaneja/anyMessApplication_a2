import { Injectable } from '@angular/core';
import { DataBlock, Message } from './jsons/DataClasses';
import { HttpClient } from '@angular/common/http';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Subscribable } from 'rxjs/Observable';
@Injectable()
export class AjaxCallService {
  getToken = {
    tokenID: 1000,
    getTokenID: function () {
      return this.tokenID++;
    }
  }
  userdata: DataBlock;
  registered: boolean;
  loggedInUser: boolean = false;

ngOnInit(){
  this.preCheck();
}
  setValue(data: DataBlock) {
    this.userdata.fullName = data.fullName || this.userdata.fullName;
    this.userdata.username = data.username || this.userdata.username;
    this.userdata.email = data.email || this.userdata.email;
    this.userdata.messages = data.messages || this.userdata.messages;
    this.userdata.password = data.password || this.userdata.password;
  }

  constructor(private http: HttpClient) {
    this.userdata = new DataBlock("", "","","","",[],"");
  }

  // test() {
  //   this.http.get("http://localhost:3000/test").subscribe(function (err: any,):void {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (err.body)
  //       console.log(err.body);
  //   })
  // }
  //Send only token and recive only boolean
  preCheck(): Subscription {
    if (localStorage.tokenID) {
      return this.http.get("http://localhost:3000/checktoken").subscribe(data => {
        console.log("preCheck=>");
        console.log(data);
        let response: any = data;
        this.loggedInUser = response.valid;
      })
    }
    return null;
  }
  //Sends only token recive object of data
  getData(): void {
    if (localStorage.tokenID) {
      this.http.get("http://localhost:3000/checktoken").subscribe(data => {
        console.log("getData=>");
        console.log(data);
        let response: any = data;
        this.loggedInUser = response.valid;
        this.setValue(response.data);
      })
    }
  }
  //Sends token and message block and recive updated the Data Block
  updateMessage(mess: Message): void {
    let token = localStorage.tokenID;
    this.http.get("http://localhost:3000/manageFav").subscribe((res) => {
      console.log("updateMessage=>");
      console.log(res);
      let response: any = res;
      if (response.valid) {
        this.setValue(JSON.parse(response.data));
      }
    })
  }
  //Sends token and message block and recive updated the Data Block
  deleteMessage(mess: Message) {
    let token = localStorage.tokenID;
    this.http.get("http://localhost:3000/deleteMessage").subscribe((res) => {
      console.log("deleteMessage=>");
      console.log(res);
      let response: any = res;
      if (response.valid) {
        this.setValue(JSON.parse(response.data));
      }
    })
  }
  //Send the data block and recives boolean
  doRegister(data: DataBlock): Subscription {
    return this.http.get("http://localhost:3000/register").subscribe(data => {
      console.log("DoRegister=>");
      console.log(data);
      let response: any = data;
      if (response.valid) {
        this.registered = true;
      }
      setTimeout(() => {
        this.registered = false;
      }, 10000);
    })
  }
  //Sends the DataBlock ( email and password) and recives only token
  doLogin(data: DataBlock): Subscription {
    return this.http.get("http://localhost:3000/login").subscribe(data => {
      console.log("DoLogin=>");
      console.log(data);
      let response: any = data;
      if (response.valid) {
        this.loggedInUser = true;
        localStorage.tokenID = response.token;
      }
    })
  }


}



