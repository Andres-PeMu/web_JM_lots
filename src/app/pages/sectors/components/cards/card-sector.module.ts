import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';
import { CardLotsComponent } from './card-lots/card-lots.component';
import { CardSectorComponent } from './card-sector/card-sector.component';
import { CardOexpensesComponent } from './card-oexpenses/card-oexpenses.component';
import { MatTableModule } from '@angular/material/table';
import { TableOexpensesComponent } from '../tables/table-oexpenses/table-oexpenses.component';
import { CardWorkerComponent } from './card-worker/card-worker.component';
import { StringModalComponent } from 'src/app/components/string-modal/string-modal.component';
import { TableLotsComponent } from '../tables/table-lots/table-lots.component';
import { CardCustomerComponent } from './card-customer/card-customer.component';
import { InvoiceComponent } from '../tables/invoice/invoice.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [CardSectorComponent, CardLotsComponent, CardOexpensesComponent, TableOexpensesComponent, CardWorkerComponent, StringModalComponent, TableLotsComponent, CardCustomerComponent, InvoiceComponent],
  exports: [CardSectorComponent, CardLotsComponent, CardOexpensesComponent, TableOexpensesComponent, CardWorkerComponent, TableLotsComponent, CardCustomerComponent, InvoiceComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    MatTableModule,
    MatGridListModule
  ]
})
export class CardSectorModule { }
