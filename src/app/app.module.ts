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
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { CanvasGrafigDoughnutComponent } from './components/canvas-grafig-doughnut/canvas-grafig-doughnut.component';
import { CanvasGrafigLineComponent } from './components/canvas-grafig-line/canvas-grafig-line.component';
import { ScrollPositionDirective } from './directives/scroll-position.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from './components/mensaje/message-dialog/message-dialog.component';
import { ConfirmationDialogComponent } from './components/mensaje/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CanvasGrafigDoughnutComponent,
    CanvasGrafigLineComponent,
    ScrollPositionDirective,
    MessageDialogComponent,
    ConfirmationDialogComponent,
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
    LoginModule,
    NgChartsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
