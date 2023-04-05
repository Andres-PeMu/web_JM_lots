import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService, getSales } from 'src/app/services/Http/sales.service';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { ChargesService, createChargues } from 'src/app/services/Http/charges.service';
import { SalesChargesCustomersService, getSalesChargesCostomersSchema } from 'src/app/services/Http/sales-charges-customers.service';

export interface PeriodicElement {
  n: number;
  chargesValue: number;
  date: string;
  idChange?: number;
  idLot?: number;
}

@Component({
  selector: 'app-table-lots',
  templateUrl: './table-lots.component.html',
  styleUrls: ['./table-lots.component.scss'],
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
export class TableLotsComponent {

  @Output() readOE = new EventEmitter()

  @Input() idlot: number = 0;

  editSalesChargesCustomerValue: FormGroup;
  newSalesChargesCustomerValue: FormGroup;

  isExpanded = false;

  stateButton = 'normal';
  stateButtonColor = 'accent';

  stateEdit= {
    tr: false,
    n: 0
  };

  dataSale: getSales[]= [];
  dataLot: getLots[]= [];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataresult: getSalesChargesCostomersSchema[] = []
  resultGetSalesChargesCostomer: getSalesChargesCostomersSchema[] = []
  dataSource: PeriodicElement[] = []
  displayedColumns: string[] = ['n', 'chargesValue', 'date', 'expand'];

  constructor(
    private _serviceSales: SalesService,
    private _servicelots: LotsService,
    private _serviceCharges: ChargesService,
    private _serviceSalesChargesCustomer: SalesChargesCustomersService
  ) {
    this.editSalesChargesCustomerValue = new FormGroup({
      'collectionValue': new FormControl('', Validators.required),
    });
    this.newSalesChargesCustomerValue = new FormGroup({
      'collectionValue': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const idlot = Number(this.idlot);
    if(idlot != 0){
      this._serviceSales.getOnelot(idlot).subscribe(res => {
        this.dataSale = res;
        console.log(this.dataSale);
      });
      this._servicelots.getOne(idlot).subscribe(res => {
        this.dataLot = res;
        console.log(this.dataLot);
        this._serviceSalesChargesCustomer.getOneLots(this.dataLot[0].ID_LOTES).subscribe((res: getSalesChargesCostomersSchema[]) => {
          this.resultGetSalesChargesCostomer = res;
          console.log(this.resultGetSalesChargesCostomer)
          this.resultGetSalesChargesCostomer.forEach((res: getSalesChargesCostomersSchema, index: number) => {
            this.ELEMENT_DATA!.push(
              {
                n: index + 1,
                chargesValue: res.VALOR_COBRO,
                date: res.FECHA_PAGO!,
                idChange: res.ID_COBROS,
                idLot: res.ID_LOTES,
              })
          });
          this.dataSource = this.ELEMENT_DATA;
        });
      });
    };
  }

  handleEdit(data: PeriodicElement) {
    this.editSalesChargesCustomerValue.controls['collectionValue']?.setValue(data.chargesValue);
    this.stateEdit.n = data.n;
    this.stateEdit.tr = !this.stateEdit.tr;
  }

  handleSave(data: PeriodicElement){
    const dataNewCharges: createChargues = {
      ...this.editSalesChargesCustomerValue.value,
      id_customer: this.dataSale[0].ID_CLIENTE!,
    }
    this._serviceCharges.update(data.idChange!.toString(), dataNewCharges).subscribe(res => {
      console.log(res)
      this.readOE.emit();
    });
  }

  handleDelete(idPago: number, idGop: number){
    // console.log(idPago)
    // console.log(idGop)
    // this._serviceOpw.delete(idGop.toString()).subscribe(res => {
    //   console.log(res);
    //   this._service.delete(idPago.toString()).subscribe(res => console.log(res));
    // });
    // this.readOE.emit();
  }

  handleNewPayment(){
    this.stateButton = (this.stateButton === 'normal') ? 'rotado' : 'normal';
    this.stateButtonColor = (this.stateButtonColor === 'accent') ? 'warn' : 'accent';
    this.isExpanded = !this.isExpanded;
  }

  handleSavePayment(){
    const dataNewCharges: createChargues = {
      ...this.newSalesChargesCustomerValue.value,
      id_customer: this.dataSale[0].ID_CLIENTE!,
    }
    this._serviceCharges.create(dataNewCharges).subscribe(resultServiceCharges =>{
      this._serviceSalesChargesCustomer.create({
        idSales: this.dataSale[0].ID_VENTAS!,
        idCharges: resultServiceCharges.ID_COBROS,
        idCustomers: this.dataSale[0].ID_CLIENTE!
      }).subscribe(resultServiceSales =>{
        console.log(resultServiceSales)
        this.readOE.emit();
      })
    })
  }


}
