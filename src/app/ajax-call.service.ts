import { Injectable } from '@angular/core';
import { DataBlock, Message } from './jsons/DataClasses';
import { HttpClient } from '@angular/common/http';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Subscribable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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
  switchloggin(b: boolean) {
    if (b == true) {
      this.preCheck().add(() => {
        this.loggedInUser = b;
      })
    }
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
    return this.http.post("http://localhost:4000/checktoken", { 'tokenID': localStorage.tokenID }).subscribe((data) => {
      let response: any = data;
      this.loggedInUser = response.valid;
      this.setValue(response.data);
    })
  }
  performLogOut(): void {
    this.loggedInUser = false;
    localStorage.clear();
    this.router.navigate(['./account/login']);
  }
  //Sends token and message block and recive updated the Data Block
  updateMessage(mess: Message): void {
    let token = localStorage.tokenID;
    this.http.post("http://localhost:4000/manageFav", { 'tokenID': localStorage.tokenID, 'message': mess.message, 'fav': mess.fav }).subscribe((res) => {
      let response: any = res;
      if (response.valid) {
        this.setValue(response.data);
      }
    })
  }
  //Sends token and message block and recive updated the Data Block
  deleteMessage(mess: Message) {
    this.http.post("http://localhost:4000/deleteMessage", { 'tokenID': localStorage.tokenID, 'message': mess.message, 'fav': mess.fav }).subscribe((res) => {
      let response: any = res;
      if (response.valid) {
        this.setValue(response.data);
      }
    })
  }
  getUserFullName(username:string):Observable<any>{
   return this.http.post("http://localhost:4000/findUserName",{'username':username});
  }
  addMessage(username: string, message: string): Subscription {
    return this.http.post("http://localhost:4000/addMessage", { 'username': username, 'message': message }).subscribe((res) => {
      this.addResult = res;
      if (this.addResult.valid) {
        this.setValue(this.addResult.data);
      }
    })
  }
  //Send the data block and recives boolean
  doRegister(data: DataBlock): Subscription {
    return this.http.post("http://localhost:4000/register", data).subscribe(data => {
      let response: any = data;
      if (response.valid) {
        this.registered = true;
      }
      setTimeout(() => {
        this.registered = false;
      }, 10000);
    })
  }

  doUpdate(data: DataBlock): Subscription {
    return this.http.post("http://localhost:4000/updateInfo", data).subscribe((data) => {
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
    return this.http.post("http://localhost:4000/login", { 'email': data.email, 'password': data.password }).subscribe((res) => {
      let response: any = res;
      if (response.valid) {
        localStorage.tokenID = response.token;
        this.switchloggin(true);
      }
    })
  }
}



