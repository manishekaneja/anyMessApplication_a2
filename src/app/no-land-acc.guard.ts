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
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!localStorage.tokenID) {
      if (state.url == "/account/dashboard" || state.url == "/account/settings") {
        this.router.navigate(["/account/login"]);
      }
    }
    else {
      if (this.ajax.loggedInUser) {
        if (state.url == "/account/login" || state.url == "/account/register") {
          this.router.navigate(["/account/dashboard"]);
        }
      }
      else {
        this.ajax.preCheck().add(() => {
          if (!(this.ajax.loggedInUser)) {
            if (state.url == "/account/dashboard" || state.url == "/account/settings") {
              this.router.navigate(["/account/login"]);
            }
          }
        })

      }



    }

    return true;
  }
}