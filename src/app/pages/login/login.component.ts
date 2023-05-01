import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AuthFrontEndService } from 'src/app/services/auth/auth-front-end.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  loginForm!: FormGroup;
  message: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authLoginUserPassword: AuthFrontEndService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('token');
    this.authLoginUserPassword.sendData(token);
    if(token){
      this.authLoginUserPassword.isLoggedIn = true;
      this.router.navigate(['./sectors']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authLoginUserPassword
      .login(this.loginForm!.value.email, this.loginForm!.value.password)
      .subscribe(login => {
        if (login.token) {
          this.authLoginUserPassword.sendData(login.token);
          this.cookieService.set('token', login.token);
          this.authLoginUserPassword.isLoggedIn = true;
          this.headerComponent?.ngOnInit();
          this.router.navigate(['./sectors']);
        } else {
          return this.message = 'No se pudo obtener los datos';
        }
        const userString = JSON.stringify(login.user);
        this.cookieService.set('user', userString);
        return login.user
      });
  }

}
