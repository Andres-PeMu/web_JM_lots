import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { user } from 'src/app/services/auth/auth-front-end.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogin: user = {
    ID_USERS: 0,
    EMAIL: '',
    ROLE: ''
  };

  constructor(
    private cookieService: CookieService,
  ){}

  ngOnInit(): void {
    const user = this.cookieService.get('user');
    this.userLogin = JSON.parse(user)[0];
  }

  menuHeader: boolean = false;

}
