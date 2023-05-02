import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { CustomersService, getCustomers } from 'src/app/services/Http/customers.service';

@Component({
  selector: 'app-card-customer',
  templateUrl: './card-customer.component.html',
  styleUrls: ['./card-customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class CardCustomerComponent {
  @Output() readOECard = new EventEmitter()

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
  ){
    this.formEditCustomer = this.fb.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._serviceCustomer.getAll().subscribe( (dataCustomers: getCustomers[]) => {
      this.customers = dataCustomers;
    })
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(customers: getCustomers) {
    this.activateIdEdit = customers.ID_CLIENTES;
    this.formEditCustomer.controls['identification'].setValue(customers.IDENTIFICACION);
    this.formEditCustomer.controls['name'].setValue(customers.NOMBRE);
    this.formEditCustomer.controls['lastName'].setValue(customers.APELLIDO);
    this.formEditCustomer.controls['email'].setValue(customers.CORREO);
    this.formEditCustomer.controls['phone'].setValue(customers.TELEFONO);
  }

  handleSaveNew() {
    let data = this.formEditCustomer.value;
    data = this.convertToUppercase(data);
    this._serviceCustomer.create(data)
    .subscribe( res =>{
      this.readOECard.emit();
    }
    );
  }

  handleEditSutmit( idCustomer: number ) {
    let data = this.formEditCustomer.value;
    data = this.convertToUppercase(data);
    this._serviceCustomer.update(idCustomer.toString(), data)
    .subscribe(res =>{
      this.readOECard.emit();
    });
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    this._serviceCustomer.delete(id.toString())
    .pipe(
      catchError( (error: HttpErrorResponse) =>{
        this.modalString = 'el trabajador tiene uno o mas lotes, para eliminar borrar los lotes';
        this.seeModal = !this.seeModal;
        return of(null);
      })
    )
    .subscribe(res =>{
      !this.seeModal ? this.readOECard.emit() : console.log(res);
    })
  }

  loanPage() {
    this.activateIdEdit = undefined;
  }

  convertToUppercase(object: { [x: string]: string; }) {
    for (let propiedad in object) {
      if (typeof object[propiedad] === 'string') {
        object[propiedad] = object[propiedad].replace(/\s+/g, '_');
        object[propiedad] = object[propiedad].toUpperCase();
      }
    }
    return object;
  }

  handleRead(){
    this.readOECard.emit();
  }

  handleNewPayment(){
    this.isExpanded = !this.isExpanded;
  }

  closeMode(){
    this.seeModal = !this.seeModal;
    console.log(this.seeModal)
  }

}
