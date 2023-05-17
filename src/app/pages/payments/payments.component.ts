import { Component, OnInit } from '@angular/core';
import { PaymentsService, getPaymentsAndWorkerAndOe } from 'src/app/services/Http/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  getPayments: getPaymentsAndWorkerAndOe[] = [];
  results: getPaymentsAndWorkerAndOe[] | undefined = []

  constructor(
    private _service: PaymentsService
  ) { }

  ngOnInit(): void {
    this._service.getAndWorkerAndOEAll().subscribe(res => {
      this.getPayments = res;
      this.results = res;
    });
  }

  handleChange(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query.length !== 0) {
      this.results = this.getPayments.filter(d => d.NOMBRE.toLowerCase().indexOf(query) > -1);
      if (this.results.length == 0) {
        this.results = this.getPayments.filter(d => d.APELLIDO.toLowerCase().indexOf(query) > -1);
        if (this.results.length == 0) {
          this.results = this.getPayments.filter(d => d.IDENTIFICACION.toString().indexOf(query) > -1);
        }
      }
      return this.results;
    }
    return this.results = this.getPayments;
  }

}
