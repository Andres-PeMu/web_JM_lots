import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderModule } from "../../components/header/header.module";
import { NavModule } from "../../components/nav/nav.module";


@NgModule({
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatGridListModule,
        HeaderModule,
        NavModule
    ]
})
export class LayoutModule { }
