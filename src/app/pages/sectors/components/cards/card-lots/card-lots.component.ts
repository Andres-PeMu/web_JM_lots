import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { CustomersService, getCustomers } from 'src/app/services/Http/customers.service';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

export interface formEditSector{
  "lotValue": string,
  "id_customer": string,
}

@Component({
  selector: 'app-card-lots',
  templateUrl: './card-lots.component.html',
  styleUrls: ['./card-lots.component.scss']
})
export class CardLotsComponent {
  @Output() readLot = new EventEmitter()

  formEditSector!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  getCustomers: getCustomers[] = [];
  results: getCustomers[] | undefined = []
  filteredOptions: Observable<getCustomers[]> | undefined;

  @Input() lots: getLots[] = []

  constructor(
    private _service: LotsService,
    private _dataSectors: DataSectorsService,
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private  router: Router,
    private _serviceC: CustomersService
  ) {}

  ngOnDestroy() {}

  ngOnInit(): void {
    this.formEditSector = this.fb.group({
      lotValue: ['', Validators.required],
      id_customer: ['', Validators.required]
    });
    this._serviceC.getAll().subscribe(res => {
      this.getCustomers = res;
      this.results = res;
    });
    this.filteredOptions = this.formEditSector.valueChanges.pipe(
      startWith(''),
      map(value => this.handleChange(value)),
    );
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleSee(id: number, nameSector: string) {
    this._dataSectors.saveId(id.toString());
    this._dataSectors.saveName(nameSector);
    this.router.navigate(['/sectors/', nameSector]);
  }

  handleEdit(id: number) {
    this.activateIdEdit = id;
  }

  handleSutmit( lotNumber: number ) {
    let data = this.formEditSector.value;
    const id_sector = Number(this._dataSectors.id)
    data = {
      ...data,
      id_sector,
      lotNumber,
    }
    this._service.create(data).subscribe(res => console.log(res));
    this.readLot.emit();
  }

  handleEditSutmit( lotNumber: number, idLot: number ) {
    let data = this.formEditSector.value;
    const id_sector = Number(this._dataSectors.id)
    data = {
      ...data,
      id_sector,
      lotNumber,
    }
    this._service.update(idLot.toString(), data).subscribe(res => console.log(res));
    this.readLot.emit();
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    this._dataSectors.saveId(id.toString())
    // this._bottomSheet.open(ShellOverviewComponent);
    this.loanPage();
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

  handleChange(event: formEditSector) {
    const query = event.id_customer;
    if (this.results!.length !== 0) {
      this.results = this.getCustomers.filter(d => d.NOMBRE.toLowerCase().indexOf(query) > -1);
      if (this.results.length == 0) {
        this.results = this.getCustomers.filter(d => d.APELLIDO.toLowerCase().indexOf(query) > -1);
        if (this.results.length == 0) {
          this.results = this.getCustomers.filter(d => d.IDENTIFICACION.toString().indexOf(query) > -1);
        }
      }
      return this.results;
    }
    return this.results = this.getCustomers;
  }

}
