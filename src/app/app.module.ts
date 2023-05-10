import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { HeaderModule } from './components/header/header.module';
import { LayoutModule } from './pages/layout/layout.module';
import { NavModule } from './components/nav/nav.module';
import { SectorsModule } from './pages/sectors/sectors.module';
import { ChargesModule } from './pages/charges/charges.module';
import { PaymentsModule } from './pages/payments/payments.module';
import { WorkersModule } from './pages/workers/workers.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './pages/login/login.module';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LayoutModule,
    NavModule,
    SectorsModule,
    ChargesModule,
    PaymentsModule,
    WorkersModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
