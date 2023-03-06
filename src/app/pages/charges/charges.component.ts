import { Component, Input, OnInit } from '@angular/core';
import { ChargesService, getChargues } from 'src/app/services/Http/charges.service';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {


  getCharges: getChargues[] = [];
  results: getChargues[] | undefined = []

  constructor(
    private _service: ChargesService
  ) { }

  ngOnInit(): void {
    this._service.getAndCustomerAll().subscribe(res => {
      this.getCharges = res;
      this.results = res;
    });
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length !== 0) {
      this.results = this.getCharges.filter(d => d.NOMBRE.toLowerCase().indexOf(query) > -1);
      if (this.results.length == 0) {
        this.results = this.getCharges.filter(d => d.APELLIDO.toLowerCase().indexOf(query) > -1);
        if (this.results.length == 0) {
          this.results = this.getCharges.filter(d => d.IDENTIFICACION.toString().indexOf(query) > -1);
        }
      }
      return this.results;
    }
    return this.results = this.getCharges;
  }

  rechargeCharges() {
    console.log('ya');
    this._service.getAndCustomerAll().subscribe(res => {
      this.getCharges = res;
      this.results = res;
      console.log(this.results);
    });
  }

}
