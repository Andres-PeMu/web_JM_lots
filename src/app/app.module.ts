import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from './components/header/header.module';
import { LayoutModule } from './pages/layout/layout.module';
import { NavModule } from './components/nav/nav.module';
import { SectorsModule } from './pages/sectors/sectors.module';
import { ChargesModule } from './pages/charges/charges.module';
import { CustomersModule } from './pages/customer/customers.module';
import { LostModule } from './pages/lots/lost.module';
import { OpeExpensesModule } from './pages/ope-expenses/ope-expenses.module';
import { PaymentsModule } from './pages/payments/payments.module';
import { SalesModule } from './pages/sales/sales.module';
import { WorkersModule } from './pages/workers/workers.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LayoutModule,
    NavModule,
    SectorsModule,
    ChargesModule,
    CustomersModule,
    LostModule,
    OpeExpensesModule,
    PaymentsModule,
    SalesModule,
    WorkersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
