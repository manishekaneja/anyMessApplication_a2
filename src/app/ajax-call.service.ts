import { Injectable } from '@angular/core';
import { DataBlock, Message } from './jsons/DataClasses';
import { HttpClient } from '@angular/common/http';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Subscribable } from 'rxjs/Observable';
import { Router } from '@angular/router';
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
  addResult: any;
  fromSetting: boolean;

  ngOnInit() {

  }
  setValue(data: DataBlock) {
    this.userdata.fullName = data.fullName || this.userdata.fullName;
    this.userdata.username = data.username || this.userdata.username;
    this.userdata.email = data.email || this.userdata.email;
    this.userdata.messages = data.messages || this.userdata.messages;
    this.userdata.password = data.password || this.userdata.password;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userdata = new DataBlock("", "", "", "", "", [], "");
  }

  //Send only token and recive only boolean
  preCheck(): Subscription {
    if (localStorage.tokenID) {
      return this.http.get("http://localhost:3000/checktoken").subscribe(data => {
        console.log("preCheck=>");
        console.log(data);
        let response: any = data;
        this.loggedInUser = response.valid;
        this.router.navigate(['/account/dashboard'])
      })
    }
    return null;
  }
  performLogOut() {
    this.loggedInUser = false;
    if (localStorage.tokenID) {
      localStorage.clear();
    }
    this.router.navigate(['./account/login']);
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

  addMessage(mess: Message): Subscription {
    let token = localStorage.tokenID;
    return this.http.get("http://localhost:3000/addMessage").subscribe((res) => {
      console.log("addMessage=>");
      console.log(res);
      this.addResult = res;
      if (this.addResult.valid) {
        this.setValue(JSON.parse(this.addResult.data));
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



