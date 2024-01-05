import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/mensaje/confirmation-dialog/confirmation-dialog.component';
import {
  CustomersService,
  getCustomers,
} from 'src/app/services/Http/customers.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-card-customer',
  templateUrl: './card-customer.component.html',
  styleUrls: ['./card-customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class CardCustomerComponent {
  @Output() readOECard = new EventEmitter();

  formEditCustomer!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  modalString: string = '';
  seeModal: boolean = false;

  isExpanded = false;

  customers: getCustomers[] = [];

  constructor(
    private _serviceCustomer: CustomersService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private messageService: ModalService,
    private dialog: MatDialog
  ) {
    this.formEditCustomer = this.fb.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._serviceCustomer
      .getAll()
      .subscribe((dataCustomers: getCustomers[]) => {
        this.customers = dataCustomers;
      });
    this.isExpanded = false;
    this.activateIdEdit = undefined;
    this.cdr.detectChanges();
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(customers: getCustomers) {
    this.activateIdEdit = customers.ID_CLIENTES;
    this.formEditCustomer.controls['identification'].setValue(
      customers.IDENTIFICACION
    );
    this.formEditCustomer.controls['name'].setValue(customers.NOMBRE);
    this.formEditCustomer.controls['lastName'].setValue(customers.APELLIDO);
    this.formEditCustomer.controls['email'].setValue(customers.CORREO);
    this.formEditCustomer.controls['phone'].setValue(customers.TELEFONO);
  }

  handleSet() {
    this.formEditCustomer.controls['identification'].setValue('');
    this.formEditCustomer.controls['name'].setValue('');
    this.formEditCustomer.controls['lastName'].setValue('');
    this.formEditCustomer.controls['email'].setValue('');
    this.formEditCustomer.controls['phone'].setValue('');
  }

  handleSaveNew() {
    let data = this.formEditCustomer.value;
    data = this.convertToUppercase(data);
    this._serviceCustomer
      .create(data)
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al crear el cliente ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe((res) => {
        this.handleSet();
        this.messageService.showMessage(
          'Operación exitosa el cliente se ha creado',
          'success'
        );
        this.ngOnInit();
        this.cdr.detectChanges();
      });
  }

  handleEditSutmit(idCustomer: number) {
    let data = this.formEditCustomer.value;
    data = this.convertToUppercase(data);
    this._serviceCustomer
      .update(idCustomer.toString(), data)
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al editar el cliente ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe((res) => {
        this.handleSet();
        this.messageService.showMessage(
          'Operación exitosa el cliente se ha editado',
          'success'
        );
        this.ngOnInit();
        this.cdr.detectChanges();
      });
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this._serviceCustomer
          .delete(id.toString())
          .pipe(
            catchError((error) => {
              this.messageService.showMessage(
                `Error en la operación al eliminar el cliente ${error.error.message}`,
                'error'
              );
              return [];
            })
          )
          .subscribe((res) => {
            this.handleSet();
            this.messageService.showMessage(
              'Operación exitosa el cliente se ha eliminado',
              'success'
            );
            this.ngOnInit();
            this.cdr.detectChanges();
            !this.seeModal ? this.ngOnInit() : console.log(res);
          });
      } else {
      }
    });
  }

  loanPage() {
    this.activateIdEdit = undefined;
  }

  convertToUppercase(object: { [x: string]: string }) {
    for (let propiedad in object) {
      if (typeof object[propiedad] === 'string') {
        object[propiedad] = object[propiedad].replace(/\s+/g, '_');
        object[propiedad] = object[propiedad].toUpperCase();
      }
    }
    return object;
  }

  handleRead() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }

  handleNewPayment() {
    this.handleSet();
    this.isExpanded = !this.isExpanded;
  }

  closeMode() {
    this.seeModal = !this.seeModal;
    this.cdr.detectChanges();
  }
}
