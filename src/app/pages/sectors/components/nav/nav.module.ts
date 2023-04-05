import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { MatButtonModule } from '@angular/material/button';
import { LotsComponent } from '../lots/lots.component';
import { OperationalExpensesComponent } from '../operational-expenses/operational-expenses.component';
import { WorkersComponent } from '../workers/workers.component';
import { CardSectorModule } from "../cards/card-sector.module";



@NgModule({
    declarations: [NavComponent, LotsComponent, OperationalExpensesComponent, WorkersComponent],
    exports: [NavComponent],
    imports: [
        CommonModule,
        NavRoutingModule,
        MatButtonModule,
        CardSectorModule,
    ]
})
export class NavModule { }
