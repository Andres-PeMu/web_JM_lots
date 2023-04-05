import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesComponent } from './charges.component';
import { CardModule } from "./components/card/card.module";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShellOverviewComponent } from './components/shell-overview/shell-overview.component';
import { LoadPageDirective } from 'src/app/directives/load-page.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      ChargesComponent,
      ShellOverviewComponent,
      LoadPageDirective
    ],
    imports: [
        CommonModule,
        ChargesRoutingModule,
        CardModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
    ],
    exports: [ChargesComponent],
})
export class ChargesModule { }
