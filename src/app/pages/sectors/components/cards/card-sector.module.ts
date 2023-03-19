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
import { TableOexpensesComponent } from '../table-oexpenses/table-oexpenses.component';


@NgModule({
  declarations: [CardSectorComponent, CardLotsComponent, CardOexpensesComponent, TableOexpensesComponent],
  exports: [CardSectorComponent, CardLotsComponent, CardOexpensesComponent, TableOexpensesComponent],
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
    MatTableModule
  ]
})
export class CardSectorModule { }
