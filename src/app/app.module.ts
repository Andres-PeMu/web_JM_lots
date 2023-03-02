import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from './components/header/header.module';
import { LayoutModule } from './pages/layout/layout.module';
import { NavModule } from './components/nav/nav.module';
import { SectorsModule } from './pages/sectors/sectors.module';
import { LotsComponent } from './pages/lots/lots.component';
import { OpeExpensesComponent } from './pages/ope-expenses/ope-expenses.component';
import { WorkersComponent } from './pages/workers/workers.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ChargesComponent } from './pages/charges/charges.component';

@NgModule({
  declarations: [
    AppComponent,
    LotsComponent,
    OpeExpensesComponent,
    WorkersComponent,
    PaymentsComponent,
    CustomerComponent,
    ChargesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LayoutModule,
    NavModule,
    SectorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
