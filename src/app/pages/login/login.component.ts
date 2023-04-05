import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthFrontEndService } from 'src/app/services/auth/auth-front-end.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  message: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authLoginUserPassword: AuthFrontEndService,
    private cookieService: CookieService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authLoginUserPassword
    .login(this.loginForm!.value.email, this.loginForm!.value.password)
    .subscribe(login => {
      if(login.token){
        this.cookieService.set('token', login.token);
        this.authLoginUserPassword.isLoggedIn = true;
        this.router.navigate(['./sectors']);
      }else{
        return this.message = 'No se pudo obtener los datos';
      }
      return login.user
    });
  }

}
