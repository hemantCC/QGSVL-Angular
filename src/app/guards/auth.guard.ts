import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: "root",
})

/**
   *authenticates user and iits role
   */
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private accountService: AccountService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("token") != null) {
      
      let roles = next.data['permittedRoles'] as Array<string>;   //if authenticated this checks for role
      if (roles) {
        if (this.accountService.roleMatch(roles)) {
          return true;
        }
        this.router.navigate(['/forbidden']);                //redirection on unauthorised roled user resource access
        return false;
      }
      return true;
    } else 
    this.router.navigate(["/account/login"]);                //redirect if user is not 
    return false;
  }
  
}
