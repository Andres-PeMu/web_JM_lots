import { Injectable } from '@angular/core';
import { PeriodicElementLots } from 'src/app/pages/sectors/components/tables/table-lots/table-lots.component';
import { PeriodicElement as Periodic } from 'src/app/pages/sectors/components/tables/table-oexpenses/table-oexpenses.component';
import { getPaymentsAndWorkerAndOe } from '../Http/opw.service';


@Injectable({
  providedIn: 'root'
})
export class DataInvoiseService {
  periodicElement: PeriodicElementLots = {
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
  periodicElementAll: PeriodicElementLots[] = []

  concepto : string = '';

  fullOrPartialInvoice: boolean = false;

  constructor() { }

  sabeDate(data: PeriodicElementLots){
    this.periodicElement = data;
  }

  sabeDateAll(data: PeriodicElementLots[]){
    this.periodicElementAll = data;
  }

  sabeConcept(concept: string){
    this.concepto = concept;
  }

}
