import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OpeExpensesService } from 'src/app/services/Http/ope-expenses.service';
import { DataOEService } from 'src/app/services/date/data-oe.service';

@Component({
  selector: 'app-shell-overview-oe',
  templateUrl: './shell-overview-oe.component.html',
  styleUrls: ['./shell-overview-oe.component.scss']
})
export class ShellOverviewOEComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ShellOverviewOEComponent>,
    private _service: DataOEService,
    private _serviceOe: OpeExpensesService
    ){}

  handleDelete(){
    this._serviceOe.delete(this._service.id).subscribe(res =>{
      console.log(res);
      window.location.reload();
    });
    this._bottomSheetRef.dismiss();
  }

}
