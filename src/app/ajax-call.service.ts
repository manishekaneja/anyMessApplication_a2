import { Injectable } from '@angular/core';
import { DataBlock, Message } from './jsons/DataClasses';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AjaxCallService {
  userdata: DataBlock;
  loggedInUser: boolean = false;

  setValue(data: DataBlock) {
    this.userdata = new DataBlock(
      data.email || this.userdata.email,
      data.password || this.userdata.password,
      data.fullname || this.userdata.fullname,
      data.messages || this.userdata.messages
    );
  }

  readonly URL: string = "http://anonym0us.herokuapp.com";

  constructor(private http: HttpClient, private router: Router) {
    this.userdata = new DataBlock();
  }

  //Send only token and recive only boolean
  preCheck(): Subscription {
    return this.http.post((this.URL + "/checktoken").toString(), { 'tokenID': localStorage.tokenID }).subscribe((data) => {
      let response: any = data;
      this.loggedInUser = response.valid;
      this.setValue(response.data);
    });
  }
  performLogOut(): void {
    this.loggedInUser = false;
    localStorage.clear();
    this.router.navigate(['./account/login']);
  }
  //Sends token and message block and recive updated the Data Block
  updateMessage(mess: Message): void {
    let token = localStorage.tokenID;
    this.http.post(this.URL + "/manageFav", { 'tokenID': localStorage.tokenID, 'message': mess.message, 'fav': mess.fav }).subscribe((res) => {
      let response: any = res;
      if (response.valid) {
        this.setValue(response.data);
      }
    })
  }
  //Sends token and message block and recive updated the Data Block
  deleteMessage(mess: Message): void {
    this.http.post(this.URL + "/deleteMessage", { 'tokenID': localStorage.tokenID, 'message': mess.message, 'fav': mess.fav }).subscribe((res) => {
      let response: any = res;
      if (response.valid) {
        this.setValue(response.data);
      }
    })
  }
  getUserFullName(username: string): Observable<any> {
    return this.http.post(this.URL + "/findUserName", { 'username': username });
  }
  addMessage(username: string, message: string): Observable<any> {
    return this.http.post(this.URL + "/addMessage", { 'username': username, 'message': message });
  }
  //Send the data block and recives boolean
  doRegister(data: DataBlock): Observable<any> {
    return this.http.post(this.URL + "/register", data);
  }

  doUpdate(data: DataBlock): Observable<any> {
    return this.http.post(this.URL + "/updateInfo", data);
  }
  //Sends the DataBlock ( email and password) and recives only token
  doLogin(data: DataBlock): Observable<any> {
    return this.http.post(this.URL + "/login", { 'email': data.email, 'password': data.password });
  }
}



