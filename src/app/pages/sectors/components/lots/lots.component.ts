import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { catchError, of, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  @Output() readLots = new EventEmitter()
  lots: getLots[] = []

  constructor(
    private _service: LotsService,
    private _dataServise: DataSectorsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this._dataServise.id) {
      this.generateLots();
    } else {
      this.router.navigate(['/sectors'])
    }
  }

  generateLots(){
    for (let lotsLup = 0; lotsLup < this._dataServise.numberLot; lotsLup++) {
      const data = {
        "lotNumber": lotsLup + 1,
        "id_sector": Number(this._dataServise.id),
      }
      this._service.getOnelotAndSector(data.lotNumber, data.id_sector!)
      .pipe(
        catchError(error => {
          return of([{
            "ID_LOTES": lotsLup + 1,
            "NUMERO_LOTE": lotsLup + 1,
            "VALOR_LOTE": 0,
            "ID_SECTOR": Number(this._dataServise.id),
            "ID_CLIENTE": 0,
          }]);
        })
      )
      .subscribe(res => {
        this.lots.push(res[0]);
        this.lots.sort((a, b) => a.NUMERO_LOTE - b.NUMERO_LOTE);
      });
    }
  }

  readLot(){
    this.readLots.emit();
  }

}
