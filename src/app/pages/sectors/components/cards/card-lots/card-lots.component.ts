import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { CustomersService, getCustomers } from 'src/app/services/Http/customers.service';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { SalesService } from 'src/app/services/Http/sales.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { ShellOverviewLotsComponent } from '../../shell-overview/shell-overview-lots/shell-overview-lots.component';
import { DataLotsService } from 'src/app/services/date/data-lots.service';
import { DataInvoiseService } from 'src/app/services/date/data-invoise.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from '../../invoises/invoise-lot/invoice.component';
import { ScrollService } from 'src/app/services/directive/scroll.service';

export interface formEditSector {
  "lotValue": string,
  "id_customer": string,
}

@Component({
  selector: 'app-card-lots',
  templateUrl: './card-lots.component.html',
  styleUrls: ['./card-lots.component.scss']
})
export class CardLotsComponent implements OnInit {
  @Output() readLot = new EventEmitter()

  formEditSector!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;
  dataSales: getLots | undefined;

  getCustomers: getCustomers[] = [];
  results: getCustomers[] | undefined = [];
  filteredOptions: Observable<getCustomers[]> | undefined;

  @Input() lots: getLots[] = [];
  lotsChange: getLots[] = [];

  constructor(
    private _serviceLots: LotsService,
    private _serviceCustomer: CustomersService,
    private _serviceSales: SalesService,
    private _dataSectors: DataSectorsService,
    private fb: FormBuilder,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private _dataLots: DataLotsService,
    private _dataInvoise: DataInvoiseService,
    public invioiseModal: MatDialog,
  ) { }

  ngOnInit(): void {
    this.lotsChange = this.lots;
    this.formEditSector = this.fb.group({
      lotValue: ['', Validators.required],
      id_customer: ['', Validators.required]
    });
    this._serviceCustomer.getAll().subscribe(res => {
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

  handleEdit(id: number, lotValue: number, idcustomer: number) {
    this.formEditSector.controls['lotValue'].setValue(lotValue);
    this.formEditSector.controls['id_customer'].setValue(idcustomer);
    this.activateIdEdit = id;
  }

  handleSutmit(lotNumber: number) {
    let data = this.formEditSector.value;
    const id_sector = Number(this._dataSectors.id)
    data = {
      ...data,
      id_sector,
      lotNumber,
    }
    this._serviceLots.create(data).subscribe(res => {
      this._serviceSales.create({
        salesValue: data.lotValue,
        id_lots: res.ID_LOTES,
        id_customer: data.id_customer,
      }).subscribe(res => {
        this.handleCancel();
        this.readLot.emit();
      });
    });
  }

  handleEditSutmit(lotNumber: number, idLot: number) {
    let data = this.formEditSector.value;
    const id_sector = Number(this._dataSectors.id)
    data = {
      ...data,
      id_sector,
      lotNumber,
    }
    this._serviceLots.update(idLot.toString(), data).subscribe(res => {
      this.dataSales = res;
      this._serviceSales.update(this.dataSales.ID_LOTES.toString(), {
        salesValue: this.dataSales.VALOR_LOTE!,
        id_lots: this.dataSales.ID_LOTES!,
        id_customer: data.id_customer,
      }).subscribe(res => {
        this.handleCancel();
        this.readLot.emit();
      })
    });
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(idLot: number) {
    this._dataLots.sabeId(idLot.toString());
    this._bottomSheet.open(ShellOverviewLotsComponent);
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

  handleChangelots(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (this.lots!.length !== 0) {
      this.lots = this.lotsChange.filter(d => d.NUMERO_LOTE.toString().toLowerCase().indexOf(query) > -1);
      return this.lots;
    }
    return this.lots = this.lotsChange;
  }

  handleRead() {
    this.handleCancel();
    this.readLot.emit();
  }

  handleInvoise(idLot: number, lotValue: number) {
    this._dataLots.id = idLot.toString();
    this._dataLots.lotValue = lotValue;
    this._dataInvoise.fullOrPartialInvoice = false;
    this.invioiseModal.open(InvoiceComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  // restoreScroll(){
  //   const scrollPosition = this.scrollService.getPosition();
  //   const element = document.querySelector('.scroll-container') as HTMLElement;
  //   element.animate({ scrollTop: scrollPosition }, 400);
  // }

}
