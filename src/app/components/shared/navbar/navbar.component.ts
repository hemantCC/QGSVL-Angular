import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userExist: boolean = false;
  isAdmin: boolean = false;
  currentLanguage: string = 'English';

  constructor(private toastr: ToastrService,
    private router: Router,
    public translate: TranslateService) {
    translate.addLangs(['English', 'French']);
    translate.setDefaultLang('English');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|French/) ? browserLang : 'English');
  }

  ngOnInit() {
    this.checkUser();
    if (localStorage.getItem('language')) {
      this.translate.use(localStorage.getItem('language'))
      this.currentLanguage = localStorage.getItem('language')
    }
  }

  checkUser() {
    if (localStorage.getItem('token') != null) {
      this.userExist = true;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
      if (userRole == 'Admin') {
        this.isAdmin = true;
      }
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!', 'Logout Sucessfull');
    if (JSON.parse(localStorage.getItem('selectedFilters')) != null) {
      localStorage.removeItem('selectedFilters');
    }
    if (this.router.url === '/Home' || this.router.url === '') {
      location.reload();
    }
    this.router.navigateByUrl('/Home');
  }

  onLanguageChange(value: string) {
    this.translate.use(value);
    localStorage.setItem('language', value);
  }

}
