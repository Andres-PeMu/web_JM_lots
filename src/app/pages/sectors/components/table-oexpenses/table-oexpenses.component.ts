import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/Http/payments.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { OpwService, getPaymentsAndWorkerAndOe } from 'src/app/services/Http/opw.service';

export interface PeriodicElement {
  n: number;
  paymentValue: number;
  date: string;
  idPago?: number;
  idGop?: number
}

@Component({
  selector: 'app-table-oexpenses',
  templateUrl: './table-oexpenses.component.html',
  styleUrls: ['./table-oexpenses.component.scss'],
  animations: [
    trigger('rotateButton', [
      state('normal', style({
        transform: 'rotate(0deg)'
      })),
      state('rotado', style({
        transform: 'rotate(45deg)'
      })),
      transition('normal => rotado', animate('200ms')),
      transition('rotado => normal', animate('200ms'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class TableOexpensesComponent implements OnInit {

  @Output() readOE = new EventEmitter()

  @Input() idWorker: number = 0;
  @Input() idOperationalExpenses: number = 0;

  editPaymentValue: FormGroup;
  newPaymentValue: FormGroup;

  isExpanded = false;

  stateButton = 'normal';
  stateButtonColor = 'accent';

  stateEdit= {
    tr: false,
    n: 0
  };

  ELEMENT_DATA: PeriodicElement[] = [];
  result: getPaymentsAndWorkerAndOe[] = []
  dataSource: PeriodicElement[] = []
  displayedColumns: string[] = ['n', 'paymentValue', 'date', 'expand'];

  constructor(
    private _serviceOpw: OpwService,
    private _service: PaymentsService,
  ) {
    this.editPaymentValue = new FormGroup({
      'paymentValue': new FormControl('', Validators.required),
    });
    this.newPaymentValue = new FormGroup({
      'paymentValue': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const id = Number(this.idOperationalExpenses);
    this._serviceOpw.getOneOe(id).subscribe((res: getPaymentsAndWorkerAndOe[]) => {
      this.result = res;
      this.result.forEach((res: getPaymentsAndWorkerAndOe, index: number) => {
        this.ELEMENT_DATA!.push(
          {
            n: index + 1,
            paymentValue: res.VALOR_PAGO,
            date: res.FECHA_DE_PAGO!,
            idPago: res.ID_PAGOS,
            idGop: res.ID_GOP,
          })
      });
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  handleEdit(data: PeriodicElement) {
    this.editPaymentValue.controls['paymentValue'].setValue(data.paymentValue);
    this.stateEdit.n = data.n;
    this.stateEdit.tr = !this.stateEdit.tr;
  }

  handleSave(id: number){
    const dto = {
      ...this.editPaymentValue.value,
      "idWorker": this.idWorker,
      "idOperationalExpenses": this.idOperationalExpenses
    };
    this._service.update(id.toString(), dto).subscribe(res => {
      console.log(res)
      this.readOE.emit();
    });
  }

  handleDelete(idPago: number, idGop: number){
    console.log(idPago)
    console.log(idGop)
    this._serviceOpw.delete(idGop.toString()).subscribe(res => {
      console.log(res);
      this._service.delete(idPago.toString()).subscribe(res => console.log(res));
    });
    this.readOE.emit();
  }

  handleNewPayment(){
    this.stateButton = (this.stateButton === 'normal') ? 'rotado' : 'normal';
    this.stateButtonColor = (this.stateButtonColor === 'accent') ? 'warn' : 'accent';
    this.isExpanded = !this.isExpanded;
  }

  handleSavePayment(){
    const dto = {
      ...this.newPaymentValue.value,
      "idWorker": this.idWorker,
      "idOperationalExpenses": this.idOperationalExpenses,
    };
    this._service.create(dto).subscribe(res =>{
      console.log(res.ID_PAGOS);
      this._serviceOpw.create({
        "idOE": this.idOperationalExpenses,
        "idPayment": res.ID_PAGOS,
        "idWorker": this.idWorker,
      }).subscribe(res => console.log(res))
      this.readOE.emit();
    })
  }

}
