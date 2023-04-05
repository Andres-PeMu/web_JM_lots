import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface user {
  ID_USERS: number;
  EMAIL: string;
  ROLE: string;
}

export interface createLogin {
  user: user;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFrontEndService {

  private apiUrl = `http://localhost:3001/api/v1/auth/login/`;
  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(email: string, password: string) {
    return this.http.post<createLogin>(this.apiUrl, { email: email, password: password });
  }

  logout() {
    this.cookieService.delete('token');
    this.isLoggedIn = false;
  }

}
