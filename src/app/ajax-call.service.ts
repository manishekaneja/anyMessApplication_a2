import { Injectable } from '@angular/core';
import { Login } from './jsons/LoginClass';
@Injectable()
export class AjaxCallService {
  loggedInUser = false;

  constructor() { console.log("ok") }

  private readJson(x: string, y: string): string {
    return `
    {"valid":"true",
    "tokenID":123123123
    }`;

  }
  private getTrue(x?: any): boolean {

    return true;

  }
  preCheck(): void {
    if (localStorage.tokenID) {
      if (this.getTrue(localStorage.tokenID)) {
        console.log("yess");
        this.loggedInUser = true;
      }
    }

  }

doLogin(data: Login): void {
    var res: any = JSON.parse(this.readJson(data.username, data.password));
    if (res.valid) {
      localStorage.tokenID = res.tokenID;
      this.loggedInUser = true;
    }
  }
}


