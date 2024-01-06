import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CardLotsComponent } from '../../cards/card-lots/card-lots.component';
import { LotsService } from 'src/app/services/Http/lots.service';
import { DataLotsService } from 'src/app/services/date/data-lots.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-shell-overview-lots',
  templateUrl: './shell-overview-lots.component.html',
  styleUrls: ['./shell-overview-lots.component.scss']
})
export class ShellOverviewLotsComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CardLotsComponent>,
    private _serviceLots: LotsService,
    private dataServiceLots: DataLotsService,
    private router: Router,
    private messageService: ModalService
  ) { }

  handleDelete() {
    this._serviceLots.delete(this.dataServiceLots.id)
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al elimiar ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe(res => {
        this.messageService.showMessage(
          'Operación exitosa se ha elimiar',
          'success'
        );
        this.router.navigate(['/sectors'])
      });
    this._bottomSheetRef.dismiss();
  }

}
