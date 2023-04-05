import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CardLotsComponent } from '../../cards/card-lots/card-lots.component';
import { LotsService } from 'src/app/services/Http/lots.service';
import { DataLotsService } from 'src/app/services/date/data-lots.service';

@Component({
  selector: 'app-shell-overview-lots',
  templateUrl: './shell-overview-lots.component.html',
  styleUrls: ['./shell-overview-lots.component.scss']
})
export class ShellOverviewLotsComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CardLotsComponent>,
    private _serviceLots: LotsService,
    private dataServiceLots: DataLotsService
    ){}

  handleDelete(){
    this._serviceLots.delete(this.dataServiceLots.id).subscribe(res =>{
      console.log(res);
      window.location.reload();
    });
    this._bottomSheetRef.dismiss();
  }

}
