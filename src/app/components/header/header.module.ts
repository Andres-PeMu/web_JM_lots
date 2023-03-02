import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { HeaderComponent } from './header.component';
import { NavModule } from "../nav/nav.module";


@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        MatToolbarModule,
        MatIconModule,
        NavModule
    ]
})
export class HeaderModule { }
