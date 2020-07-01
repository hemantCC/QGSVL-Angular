import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginUrl,registerUrl } from '../config/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  registerUser(user : User){
    return this.http.post(registerUrl, user);
  }

  loginUser(user:any){
    return this.http.post(loginUrl, user);
  }

  roleMatch(allowedRoles: any): boolean {
    var isMatch =  false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
