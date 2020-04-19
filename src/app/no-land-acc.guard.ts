import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AjaxCallService } from "./ajax-call.service";

@Injectable()
export class LandAtGuard implements CanActivate {
  constructor(
    private ajaxService: AjaxCallService,
    private routerInstance: Router
  ) {}
  previous: string;
  pre2: string;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.ajaxService.isLoggedIn) {
      if (
        state.url == "/account/dashboard" ||
        state.url == "/account/settings"
      ) {
        this.routerInstance.navigate(["/account/login"]);
      }
    } else {
      if (state.url == "/account/login" || state.url == "/account/register") {
        this.routerInstance.navigate(["/account/dashboard"]);
      }
    }
    return true;
  }
}
