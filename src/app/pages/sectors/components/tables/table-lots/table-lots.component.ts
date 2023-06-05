import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SalesService, getSales } from 'src/app/services/Http/sales.service';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { ChargesService, createChargues } from 'src/app/services/Http/charges.service';
import { SalesChargesCustomersService, getSalesChargesCostomersSchema } from 'src/app/services/Http/sales-charges-customers.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from '../../invoises/invoise-lot/invoice.component';
import { DataInvoiseService } from 'src/app/services/date/data-invoise.service';
import { InvoiceService } from 'src/app/services/Http/invoice.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

export interface PeriodicElementLots {
  n: number;
  chargesValue: number;
  date: string;
  idChange?: number;
  idLot?: number;
  idVencocli?: number;
  idCustomer?: number;
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
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
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

  stateEdit = {
    tr: false,
    n: 0
  };

  dataSale: getSales[] = [];
  dataLot: getLots[] = [];
  ELEMENT_DATA: PeriodicElementLots[] = [];
  dataresult: getSalesChargesCostomersSchema[] = []
  resultGetSalesChargesCostomer: getSalesChargesCostomersSchema[] = []
  dataSource: PeriodicElementLots[] = []
  dataSourceNewPayment: PeriodicElementLots[] = [{
    n: 1,
    chargesValue: 0,
    date: '2023/05/22'
  }];
  displayedColumns: string[] = ['n', 'chargesValue', 'date', 'expand'];

  constructor(
    private _serviceInvoise: InvoiceService,
    private _serviceSales: SalesService,
    private _servicelots: LotsService,
    private _serviceCharges: ChargesService,
    private _serviceSalesChargesCustomer: SalesChargesCustomersService,
    private cd: ChangeDetectorRef,
    private dataInvoise: DataInvoiseService,
    private dataSector: DataSectorsService,
    public invioiseModal: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.editSalesChargesCustomerValue = new FormGroup({
      'collectionValue': new FormControl('', Validators.required),
    });
    this.newSalesChargesCustomerValue = this.formBuilder.group({
      collectionValue: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stateEdit.tr = false;
    this.dataSource = [];
    this.ELEMENT_DATA = [];
    const idlot = Number(this.idlot);
    if (idlot !== 0) {
      this._serviceSales.getOnelot(idlot).subscribe(res => {
        this.dataSale = res;
      });
      this.serviceLot();
    };
  }

  serviceLot() {
    const idlot = Number(this.idlot);
    this._servicelots.getOne(idlot).subscribe(res => {
      this.dataLot = res;
      this._serviceSalesChargesCustomer.getOneLots(this.dataLot[0].ID_LOTES).subscribe((res: getSalesChargesCostomersSchema[]) => {
        this.resultGetSalesChargesCostomer = res;
        this.resultGetSalesChargesCostomer.forEach((res: getSalesChargesCostomersSchema, index: number) => {
          this.ELEMENT_DATA!.push(
            {
              n: index + 1,
              chargesValue: res.VALOR_COBRO,
              date: res.FECHA_PAGO!,
              idChange: res.ID_COBROS,
              idLot: res.ID_LOTES,
              idVencocli: res.ID_VENCOCLI,
              idCustomer: res.ID_CLIENTES,
            })
        });
        this.dataSource = this.ELEMENT_DATA;
        this.dataInvoise.sabeDateAll(this.ELEMENT_DATA)
      });
    });
  }

  handleEdit(data: PeriodicElementLots) {
    this.editSalesChargesCustomerValue.controls['collectionValue']?.setValue(data.chargesValue);
    this.stateEdit.n = data.n;
    this.stateEdit.tr = !this.stateEdit.tr;
  }

  handleSave(data: PeriodicElementLots) {
    const dataNewCharges: createChargues = {
      ...this.editSalesChargesCustomerValue.value,
      id_customer: this.dataSale[0].ID_CLIENTE!,
    }
    this._serviceCharges.update(data.idChange!.toString(), dataNewCharges).subscribe(res => {
      this.ngOnInit();
    });
  }

  handleDelete(idPago: number) {
    const dataCharges = this.resultGetSalesChargesCostomer.filter(data => idPago === data.ID_COBROS)
    this._serviceCharges.delete(idPago.toString()).subscribe(res => {
      this._serviceSalesChargesCustomer.delete(dataCharges[0].ID_VENCOCLI.toString()).subscribe(res => this.cd.detectChanges());
    });
    this.ngOnInit();
  }

  handleNewPayment() {
    this.stateButton = (this.stateButton === 'normal') ? 'rotado' : 'normal';
    this.stateButtonColor = (this.stateButtonColor === 'accent') ? 'warn' : 'accent';
    this.isExpanded = !this.isExpanded;
  }

  handleSavePayment() {
    const idlot = parseInt(this.dataSector.id);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dataNewCharges: createChargues = {
      collectionValue: this.newSalesChargesCustomerValue.value.collectionValue,
      date: this.newSalesChargesCustomerValue.value.dateControl.toLocaleDateString('es-ES', options).toString(),
      id_customer: this.dataSale[0].ID_CLIENTE!,
    }
    this._serviceCharges.create(dataNewCharges).subscribe(resultServiceCharges => {
      this._serviceSalesChargesCustomer.create({
        idSales: this.dataSale[0].ID_VENTAS!,
        idCharges: resultServiceCharges.ID_COBROS,
        idCustomers: this.dataSale[0].ID_CLIENTE!
      }).subscribe(resultServiceSales => {
        this.newSalesChargesCustomerValue.reset();
        this.handleNewPayment();
        this.ngOnInit();
        this._serviceInvoise.create({
          sectorId: idlot,
          customerId: this.dataSale[0].ID_CLIENTE!,
          concept: 'VENTA DE LOTE',
          idVencocli: resultServiceSales.ID_VENCOCLI!,
        }).subscribe((res) => { });
        console.log('siii', resultServiceSales)
        console.log('no', this.dataInvoise.periodicElementAll)
      })
    });
  }

  openModal(data: PeriodicElementLots) {
    this.dataInvoise.sabeDate(data);
    this.dataInvoise.sabeConcept('POR PAGO LOTE')
    this.dataInvoise.fullOrPartialInvoice = true;
    this.invioiseModal.open(InvoiceComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }


}
