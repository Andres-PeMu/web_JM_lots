import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewSectorComponent } from './new-sector.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CardSectorModule } from "../cards/card-sector.module";


@NgModule({
    declarations: [NewSectorComponent],
    exports: [NewSectorComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        CardSectorModule
    ]
})
export class NewSectorModule { }
