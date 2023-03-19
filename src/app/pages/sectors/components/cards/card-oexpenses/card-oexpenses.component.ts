import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { OpeExpensesService, getOe } from 'src/app/services/Http/ope-expenses.service';
import { WorkersService, getWorkers } from 'src/app/services/Http/workers.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

@Component({
  selector: 'app-card-oexpenses',
  templateUrl: './card-oexpenses.component.html',
  styleUrls: ['./card-oexpenses.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CardOexpensesComponent {

  @Output() readOECard = new EventEmitter()

  formEditOe!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  isExpanded = false;

  getWorkers: getWorkers[] = [];
  results: getWorkers[] | undefined = []
  filteredOptions: Observable<getWorkers[]> | undefined;

  @Input() OperationalExpenses: getOe[] = []

  constructor(
    private _dataSectors: DataSectorsService,
    private fb: FormBuilder,
    // private _bottomSheet: MatBottomSheet,
    private  router: Router,
    private _serviceWorkers: WorkersService,
    private _service: OpeExpensesService
  ) {}

  ngOnInit(): void {
    this.formEditOe = this.fb.group({
      expenseType: ['', Validators.required],
      hourValue: ['', Validators.required],
      hourValueWorked: ['', Validators.required],
      idWorker: ['', Validators.required],
    });
    this._serviceWorkers.getOneSector(Number(this._dataSectors.id)).subscribe(res => {
      console.log(res)
      this.getWorkers = res;
      this.results = res;
    });
    this.filteredOptions = this.formEditOe.valueChanges.pipe(
      startWith(''),
      map(value => this.handleChange(value)),
    );
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(id: number) {
    this.activateIdEdit = id;
  }

  handleSaveNew() {
    let data = this.formEditOe.value;
    const idSector = Number(this._dataSectors.id)
    const fullValue = data.hourValue * data.hourValueWorked;
    data = {
      ...data,
      idSector,
      fullValue
    }
    this._service.create(data)
    .subscribe(res =>{
      console.log(res);
      this.readOECard.emit();
    });
  }

  handleEditSutmit( id_oE: number ) {
    let data = this.formEditOe.value;
    const idSector = Number(this._dataSectors.id)
    const fullValue = data.hourValue * data.hourValueWorked;
    data = {
      ...data,
      idSector,
      fullValue
    }
    this._service.update(id_oE.toString(), data)
    .subscribe(res =>{
      console.log(res);
      this.readOECard.emit();
    });
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    // this._dataSectors.saveId(id.toString())
    // // this._bottomSheet.open(ShellOverviewComponent);
    // this.loanPage();
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

  handleChange(event: any) {
    const query = event.id_customer;
    if (this.results!.length !== 0) {
      this.results = this.getWorkers.filter(d => d.NOMBRE.toLowerCase().indexOf(query) > -1);
      if (this.results.length == 0) {
        this.results = this.getWorkers.filter(d => d.APELLIDO.toLowerCase().indexOf(query) > -1);
        if (this.results.length == 0) {
          this.results = this.getWorkers.filter(d => d.IDENTIFICACION.toString().indexOf(query) > -1);
        }
      }
      return this.results;
    }
    return this.results = this.getWorkers;
  }

  handleRead(){
    this.readOECard.emit();
  }

  handleNewPayment(){
    this.isExpanded = !this.isExpanded;
  }

}