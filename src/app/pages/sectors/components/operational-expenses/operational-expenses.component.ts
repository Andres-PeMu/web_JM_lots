import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OpeExpensesService, getOe } from 'src/app/services/Http/ope-expenses.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

@Component({
  selector: 'app-operational-expenses',
  templateUrl: './operational-expenses.component.html',
  styleUrls: ['./operational-expenses.component.scss']
})
export class OperationalExpensesComponent   implements OnInit {

  @Output() readOE = new EventEmitter()

  oExpenses: getOe[] = []

  constructor(
    private _service: OpeExpensesService,
    private router: Router,
    private _dataServise: DataSectorsService,
  ){}

  ngOnInit(): void {
    if (this._dataServise.id) {
      const idSector = Number(this._dataServise.id);
      this._service.getOneSector(idSector).subscribe(res => this.oExpenses = res);
    } else {
      this.router.navigate(['/sectors']);
    }
  }

  reload(){
    this.oExpenses = [];
    this.ngOnInit();
    // this.readOE.emit();
  }

}
