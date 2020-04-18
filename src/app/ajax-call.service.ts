import { Injectable } from "@angular/core";
import { User, Message, ApiResponse } from "./jsons/DataClasses";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from "@angular/material/snack-bar";

@Injectable()
export class AjaxCallService {
  private _userData: User;
  private _token: string;
  public isLoggedIn: boolean;
  public isUserLogedInObserver: Subject<boolean>;

  // readonly URL: string = "http://anonym0us.herokuapp.com/api";
  public readonly URL: string = "http://192.168.1.94:4000/api";

  constructor(private httpIntsance: HttpClient, private snackBar: MatSnackBar) {
    this.isUserLogedInObserver = new Subject<boolean>();
    this.isLoggedIn = false;
    this.userData = new User("", "", "");
    if (localStorage) {
      let localToken: string = localStorage.getItem("token");
      if (localToken) {
        this.token = localToken;
        let localObject = JSON.parse(localStorage.getItem("data"));
        this.isLoggedIn = true;
        if (localObject) {
          let localData: User = User.convertToUser(localObject);
          this.userData = localData;
        }
      }
    }
    this.isUserLogedInObserver.next(this.isLoggedIn);
  }

  setUser(user: User) {
    let userObject = User.convertToUser(user);
    if (!User.isSame(this.userData, userObject)) {
      localStorage.setItem("data", JSON.stringify(userObject));
      this._userData = userObject;
    }
  }

  setToken(token: string) {
    if (token) {
      this.isLoggedIn = true;
      if (token !== this.token) {
        localStorage.setItem("token", token.toString());
        this._token = token;
      }
    } else {
      this.isLoggedIn = false;
    }
    this.isUserLogedInObserver.next(this.isLoggedIn);
  }

  get userData(): User {
    return this._userData;
  }

  set userData(user: User) {
    this.setUser(user);
  }

  get token(): string {
    return this._token;
  }

  set token(str: string) {
    this.setToken(str);
  }

  public notify(
    message: string,
    closeable: boolean = true
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, closeable ? "Close" : "", {
      duration: 5000,
    });
  }

  registerUser(userObject: User): Observable<ApiResponse> {
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/user`,
      userObject.getRegisterDataFormat(),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
    );
  }

  loginUser(userObject: User): Observable<ApiResponse> {
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/login`,
      {
        email: userObject.email,
        password: userObject.password,
      },
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
    );
  }

  logoutUser(): Observable<ApiResponse> {
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/logout`,
      {},
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  getFullUserDetails(): Observable<ApiResponse> {
    return this.httpIntsance.get<ApiResponse>(`${this.URL}/user`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getBasicUserDetails(id: string): Observable<ApiResponse> {
    return this.httpIntsance.get<ApiResponse>(
      `${this.URL}/basicuser?userid=${id}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  updateUser(userObject: User): Observable<ApiResponse> {
    return this.httpIntsance.patch<ApiResponse>(
      `${this.URL}/user`,
      userObject.getRegisterDataFormat(),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  sendNewMessage(messageObject: Message) {
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/message`,
      {
        sendTo: messageObject.sendTo,
        message: messageObject.message,
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  updateMessage(messageObject: Message): Observable<ApiResponse> {
    return this.httpIntsance.patch<ApiResponse>(
      `${this.URL}/message`,
      {
        messageid: messageObject._id,
        liked: messageObject.liked,
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  //Sends token and message block and recive updated the Data Block
  // updateMessage(mess: Message): void {
  //   let token = localStorage.tokenID;
  //   this.http.post(this.URL + "/manageFav", { 'tokenID': localStorage.tokenID, 'message': mess.message, 'fav': mess.liked }).subscribe((res) => {
  //     let response: any = res;
  //     if (response.valid) {
  //       this.setValue(response.data);
  //     }
  //   })
  // }
  //Sends token and message block and recive updated the Data Block
  deleteMessage(messageObject: Message): void {
    this.httpIntsance
      .delete(this.URL + "/message", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .subscribe((res) => {
        let response: any = res;
        if (response.valid) {
          this.setUser(response.data);
        }
      });
  }
}
