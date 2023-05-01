import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, of } from 'rxjs';

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

  private token = new Subject<string>();
  private apiUrl = `http://localhost:3001/api/v1/auth/login/`;
  isLoggedIn = false;
  userLogin: user = {
    ID_USERS: 0,
    EMAIL: '',
    ROLE: ''
  };

  $userLogin = of(this.userLogin)

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  login(email: string, password: string) {
    return this.http.post<createLogin>(this.apiUrl, { email: email, password: password });
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.isLoggedIn = false;
  }

  sendData(dato: string) {
    this.token.next(dato);
  }

  getData(): Observable<any> {
    return this.token.asObservable();
  }

}
