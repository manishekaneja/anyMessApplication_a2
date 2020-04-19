import { Injectable } from "@angular/core";
import { User, Message, ApiResponse } from "./jsons/DataClasses";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
  public isUserDataObserver: Subject<User>;

  // readonly URL: string = "http://anonym0us.herokuapp.com/api";
  public readonly URL: string = "http://192.168.1.94:4000/api";

  constructor(private httpIntsance: HttpClient, private snackBar: MatSnackBar) {
    this.isUserLogedInObserver = new Subject<boolean>();
    this.isUserDataObserver = new Subject<User>();
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
      this.isUserDataObserver.next(userObject);
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

  private getHeaders(withHeader: boolean = false): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      ...(withHeader
        ? {
            Authorization: `Bearer ${this.token}`,
          }
        : {}),
    });
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
    let httpHeaders = this.getHeaders(false);
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/user`,
      userObject.getRegisterDataFormat(),
      {
        headers: httpHeaders,
      }
    );
  }

  loginUser(userObject: User): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(false);
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/login`,
      {
        email: userObject.email,
        password: userObject.password,
      },
      {
        headers: httpHeaders,
      }
    );
  }

  logoutUser(): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(true);
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/logout`,
      {},
      {
        headers: httpHeaders,
      }
    );
  }

  getFullUserDetails(): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(true);
    return this.httpIntsance.get<ApiResponse>(`${this.URL}/user`, {
      headers: httpHeaders,
    });
  }

  getBasicUserDetails(id: string): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(false);
    return this.httpIntsance.get<ApiResponse>(
      `${this.URL}/basicuser?userid=${id}`,
      {
        headers: httpHeaders,
      }
    );
  }

  updateUser(userObject: User): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(true);
    return this.httpIntsance.patch<ApiResponse>(
      `${this.URL}/user`,
      userObject.getRegisterDataFormat(),
      {
        headers: httpHeaders,
      }
    );
  }

  sendNewMessage(messageObject: Message) {
    let httpHeaders = this.getHeaders(false);
    return this.httpIntsance.post<ApiResponse>(
      `${this.URL}/message`,
      {
        sendTo: messageObject.sendTo,
        message: messageObject.message,
      },
      {
        headers: httpHeaders,
      }
    );
  }

  updateMessage(messageObject: Message): Observable<ApiResponse> {
    let httpHeaders = this.getHeaders(true);

    return this.httpIntsance.patch<ApiResponse>(
      `${this.URL}/message`,
      {
        id: messageObject._id,
      },
      {
        headers: httpHeaders,
      }
    );
  }

  //Sends token and message block and recive updated the Data Block
  deleteMessage(messageObject: Message): Observable<ApiResponse> {
    let httpParams = new HttpParams({
      fromObject: {
        id: messageObject["_id"],
      },
    });
    let httpHeaders = this.getHeaders(true);
    return this.httpIntsance.delete<ApiResponse>(this.URL + "/message", {
      headers: httpHeaders,
      params: httpParams,
    });
  }
}
