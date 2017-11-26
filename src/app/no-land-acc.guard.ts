import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AjaxCallService } from './ajax-call.service';
import { Console } from '@angular/core/src/console';

@Injectable()
export class LandAtGuard implements CanActivate {
  constructor(private router: Router, private ajax: AjaxCallService) { }
  previous: string;
  pre2: string
  // move(): boolean {
  //   if (this.pre2) {
  //     this.router.navigate([this.pre2])
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }

  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // console.log(state.url);
    if (!(this.ajax.loggedInUser)) {
      if (state.url == "/account/dashboard" || state.url == "/account/settings") {
        this.router.navigate(["/account/login"]);
      }
    }
    else {
      if (state.url == "/account/login" || state.url == "/account/register") {
        this.router.navigate(["/account/dashboard"]);
      }
    }
    // console.log("LLG :" + this.ajax.loggedInUser);
    console.log("Add " + state.url + " loggedIn " + this.ajax.loggedInUser + " pre " + this.previous + " pre2 " + this.pre2);
    // this.pre2=this.previous;
    // this.previous = state.url;

    return true;
  }
}