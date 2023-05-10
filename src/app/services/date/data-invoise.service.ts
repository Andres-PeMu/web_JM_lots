import { Injectable } from '@angular/core';
import { PeriodicElement } from 'src/app/pages/sectors/components/tables/table-lots/table-lots.component';
import { PeriodicElement as Periodic } from 'src/app/pages/sectors/components/tables/table-oexpenses/table-oexpenses.component';
import { getPaymentsAndWorkerAndOe } from '../Http/opw.service';


@Injectable({
  providedIn: 'root'
})
export class DataInvoiseService {
  periodicElement: PeriodicElement = {
    n: 0,
    chargesValue: 0,
    date: '',
    idChange: 0,
    idLot: 0,
    idVencocli: 0,
    idCustomer: 0,
  }

  getPaymentsAndWorkerAndOe: getPaymentsAndWorkerAndOe[] = []
  periodicElementGop: Periodic = {
    n: 0,
    paymentValue: 0,
    date: '',
    idGop: 0,
    idPago: 0,
  }

  concepto : string = '';

  fullOrPartialInvoice: boolean = false;

  constructor() { }

  sabeDate(data: PeriodicElement){
    this.periodicElement = data;
  }

  sabeConcept(concept: string){
    this.concepto = concept;
  }

}
