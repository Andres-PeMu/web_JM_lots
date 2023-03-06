import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PaymentsService, getPaymentsAndWorkerAndOe } from 'src/app/services/Http/payments.service';
import { DataChargesService } from 'src/app/services/date/data-charges.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() payments?: getPaymentsAndWorkerAndOe[];
  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  constructor(
    private _service: PaymentsService,
    private _dataService: DataChargesService,
    private _bottomSheet: MatBottomSheet
  ){}

  handleinputEdit(event: any){
    const query = event.target.value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(id: number){
    this.activateIdEdit = id;
  }

  handleCancel(){
    this.activateIdEdit = undefined;
  }

  loanPage(){
    this.activateIdEdit = undefined;
  }

}
