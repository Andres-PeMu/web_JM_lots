import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentsService } from 'src/app/services/Http/payments.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  OpwService,
  getPaymentsAndWorkerAndOe,
} from 'src/app/services/Http/opw.service';
import { DataInvoiseService } from 'src/app/services/date/data-invoise.service';
import { InvoiseGoComponent } from '../../invoises/invoise-go/invoise-go.component';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceGopService } from 'src/app/services/Http/invoice-gop.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { getOe } from 'src/app/services/Http/ope-expenses.service';
import { catchError } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ConfirmationDialogComponent } from 'src/app/components/mensaje/confirmation-dialog/confirmation-dialog.component';

export interface PeriodicElement {
  n: number;
  paymentValue: number;
  date: string;
  idPago?: number;
  idGop?: number;
}

@Component({
  selector: 'app-table-oexpenses',
  templateUrl: './table-oexpenses.component.html',
  styleUrls: ['./table-oexpenses.component.scss'],
  animations: [
    trigger('rotateButton', [
      state(
        'normal',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'rotado',
        style({
          transform: 'rotate(45deg)',
        })
      ),
      transition('normal => rotado', animate('200ms')),
      transition('rotado => normal', animate('200ms')),
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableOexpensesComponent implements OnInit {
  @Output() readOE = new EventEmitter();

  @Input() idWorker: number = 0;
  @Input() idOperationalExpenses: number = 0;
  @Input() OperationalExpensesTotal: getOe = {
    ID_GASTOS: 0,
    TIPO_GASTO: '',
    VALOR_HORA: 0,
    HORAS_TRABAJADAS: 0,
    ID_TRABAJADOR: 0,
    ID_SECTOR: 0,
    VALOR_TOTAL: 0,
  };

  editPaymentValue: FormGroup;
  newPaymentValue: FormGroup;
  newPaymenChargesCustomerValue: FormGroup;

  isExpanded = false;

  stateButton = 'normal';
  stateButtonColor = 'accent';

  stateEdit = {
    tr: false,
    n: 0,
  };

  ELEMENT_DATA: PeriodicElement[] = [];
  result: getPaymentsAndWorkerAndOe[] = [];
  dataSource: PeriodicElement[] = [];
  dataSourceNewPayment: PeriodicElement[] = [
    {
      n: 0,
      paymentValue: 0,
      date: '',
    },
  ];
  displayedColumns: string[] = ['n', 'paymentValue', 'date', 'expand'];

  constructor(
    private _serviceOpw: OpwService,
    private _service: PaymentsService,
    private dataInvoiseService: DataInvoiseService,
    public invioiseModal: MatDialog,
    private formBuilder: FormBuilder,
    private invoiceGopService: InvoiceGopService,
    public dataSector: DataSectorsService,
    private messageService: ModalService,
    private dialog: MatDialog
  ) {
    this.editPaymentValue = new FormGroup({
      paymentValue: new FormControl('', Validators.required),
    });
    this.newPaymentValue = new FormGroup({
      paymentValue: new FormControl('', Validators.required),
    });
    this.newPaymenChargesCustomerValue = this.formBuilder.group({
      collectionValue: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.idOperationalExpenses);
    this._serviceOpw
      .getOneOe(id)
      .subscribe((res: getPaymentsAndWorkerAndOe[]) => {
        this.result = res;
        this.dataInvoiseService.getPaymentsAndWorkerAndOe = this.result;
        this.result.forEach((res: getPaymentsAndWorkerAndOe, index: number) => {
          this.ELEMENT_DATA!.push({
            n: index + 1,
            paymentValue: res.VALOR_PAGO,
            date: res.FECHA_DE_PAGO!,
            idPago: res.ID_PAGOS,
            idGop: res.ID_GOP,
          });
        });
        this.dataInvoiseService.periodicElementGop = this.ELEMENT_DATA[0];
        this.dataSource = this.ELEMENT_DATA;
      });
  }

  handleEdit(data: PeriodicElement) {
    this.editPaymentValue.controls['paymentValue'].setValue(data.paymentValue);
    this.stateEdit.n = data.n;
    this.stateEdit.tr = !this.stateEdit.tr;
  }

  handleSave(id: number) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dto = {
      ...this.editPaymentValue.value,
      idWorker: this.idWorker,
      idOperationalExpenses: this.idOperationalExpenses,
    };
    this._service
      .update(id.toString(), dto)
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al editar ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe((res) => {
        this.ELEMENT_DATA = [];
        this.dataSource = [];
        this.stateEdit.tr = !this.stateEdit.tr;
        this.messageService.showMessage(
          'Operación exitosa el cliente se ha editado',
          'success'
        );
        this.ngOnInit();
      });
  }

  handleDelete(idPago: number, idGop: number) {
    this._serviceOpw
      .delete(idGop.toString())
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al eliminar ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe((res) => {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);

        dialogRef
          .afterClosed()
          .pipe(
            catchError((error) => {
              this.messageService.showMessage(
                `Error en la operación al eliminar ${error.error.message}`,
                'error'
              );
              return [];
            })
          )
          .subscribe((result) => {
            if (result === true) {
              this._service.delete(idPago.toString()).subscribe((res) => {
                this.ELEMENT_DATA = [];
                this.dataSource = [];
                this.messageService.showMessage(
                  'Operación exitosa el cliente se ha eliminado',
                  'success'
                );
                this.ngOnInit();
              });
            } else {
            }
          });
      });
  }

  handleNewPayment() {
    this.stateButton = this.stateButton === 'normal' ? 'rotado' : 'normal';
    this.stateButtonColor =
      this.stateButtonColor === 'accent' ? 'warn' : 'accent';
    this.isExpanded = !this.isExpanded;
  }

  handleSavePayment() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dto = {
      paymentValue: this.newPaymenChargesCustomerValue.value.collectionValue,
      PaymentDate: this.newPaymenChargesCustomerValue.value.dateControl
        .toLocaleDateString('es-ES', options)
        .toString(),
      idWorker: this.idWorker,
      idOperationalExpenses: this.idOperationalExpenses,
    };
    this._service.create(dto).subscribe((res) => {
      this._serviceOpw
        .create({
          idOE: this.idOperationalExpenses,
          idPayment: res.ID_PAGOS,
          idWorker: this.idWorker,
        })
        .pipe(
          catchError((error) => {
            this.messageService.showMessage(
              `Error en la operación al crear ${error.error.message}`,
              'error'
            );
            return [];
          })
        )
        .subscribe((res) => {
          this.ELEMENT_DATA = [];
          this.dataSource = [];
          this.isExpanded = !this.isExpanded;
          this.stateButton =
            this.stateButton === 'normal' ? 'rotado' : 'normal';
          this.stateButtonColor =
            this.stateButtonColor === 'accent' ? 'warn' : 'accent';
          this.newPaymenChargesCustomerValue.reset();
          this.messageService.showMessage(
            'Operación exitosa se ha creado',
            'success'
          );
          this.ngOnInit();
          this.createInvoce();
        });
    });
  }

  createInvoce() {
    const id = Number(this.idOperationalExpenses);
    this._serviceOpw
      .getOneOe(id)
      .subscribe((res: getPaymentsAndWorkerAndOe[]) => {
        const idOE = res[0].ID_GOP;
        console.log(
          'idOE',
          idOE,
          'this.idOperationalExpenses',
          this.idOperationalExpenses
        );
        const idSector = parseInt(this.dataSector.id);
        console.log('OperationalExpensesTotal', this.OperationalExpensesTotal);
        this.invoiceGopService
          .create({
            sectorId: idSector,
            workerId: this.idWorker,
            concept: this.OperationalExpensesTotal.TIPO_GASTO,
            idGop: idOE,
          })
          .subscribe((create) => {
            console.log('create', create);
          });
      });
  }

  modalInvoise(element: PeriodicElement) {
    console.log('modalInvoise', element);
    this.dataInvoiseService.periodicElementGop = element;
    this.dataInvoiseService.fullOrPartialInvoice = false;
    this.invioiseModal.open(InvoiseGoComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
}
