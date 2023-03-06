import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ChargesService } from 'src/app/services/Http/charges.service';
import { DataChargesService } from 'src/app/services/date/data-charges.service';

@Component({
  selector: 'app-shell-overview',
  templateUrl: './shell-overview.component.html',
  styleUrls: ['./shell-overview.component.scss']
})
export class ShellOverviewComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ShellOverviewComponent>,
    private _service: ChargesService,
    private _dataService: DataChargesService,
    ){}

  handleDelete(){
    this._service.delete(this._dataService.id).subscribe( data => console.log(data));
    this._bottomSheetRef.dismiss();
  }

}
