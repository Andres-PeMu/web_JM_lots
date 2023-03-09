import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SectorsService } from 'src/app/services/Http/sectors.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

@Component({
  selector: 'app-shell-overview',
  templateUrl: './shell-overview.component.html',
  styleUrls: ['./shell-overview.component.scss']
})
export class ShellOverviewComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ShellOverviewComponent>,
    private _service: SectorsService,
    private _dataService: DataSectorsService,
    ){}

  handleDelete(){
    this._service.delete(this._dataService.id).subscribe( data => console.log(data));
    window.location.reload();
    this._bottomSheetRef.dismiss();
  }
}
