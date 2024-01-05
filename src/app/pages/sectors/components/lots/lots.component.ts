import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  @Output() readLots = new EventEmitter();
  lots: getLots[] = [];
  getlots: getLots[] = [];

  constructor(
    private _service: LotsService,
    private _dataServise: DataSectorsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.lots = []
    if (this._dataServise.id) {
      this.generateLots();
    } else {
      this.router.navigate(['/sectors'])
    }
  }

  generateLots() {
    for (let lotsLup = 0; lotsLup < this._dataServise.numberLot; lotsLup++) {
      const data = {
        "lotNumber": lotsLup + 1,
        "id_sector": Number(this._dataServise.id),
      }
      this._service.getOnelotAndSector(data.lotNumber, data.id_sector!)
        .subscribe(res => {
          this.lots.push(res[0]);
          this.lots.sort((a, b) => a.NUMERO_LOTE - b.NUMERO_LOTE);
        });
    }
  }

  readLot() {
    this.ngOnInit();
  }

}
