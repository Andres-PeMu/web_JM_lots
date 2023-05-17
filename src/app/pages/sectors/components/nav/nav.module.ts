import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { MatButtonModule } from '@angular/material/button';
import { LotsComponent } from '../lots/lots.component';
import { OperationalExpensesComponent } from '../operational-expenses/operational-expenses.component';
import { WorkersComponent } from '../workers/workers.component';
import { CardSectorModule } from "../cards/card-sector.module";
import { CustomersComponent } from '../customers/customers.component';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations: [NavComponent, LotsComponent, OperationalExpensesComponent, WorkersComponent, CustomersComponent],
    exports: [NavComponent],
    imports: [
        CommonModule,
        NavRoutingModule,
        MatButtonModule,
        CardSectorModule,
        MatIconModule,
        MatFormFieldModule,
    ]
})
export class NavModule { }
