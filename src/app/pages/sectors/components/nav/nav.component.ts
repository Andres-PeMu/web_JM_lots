import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectorsService } from 'src/app/services/Http/sectors.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  lost: boolean = false;
  oExpenses: boolean = false;
  workers: boolean = false;
  payments: boolean = false;

  constructor(
    private _service: SectorsService,
    private  router: Router,
    private _dataServise: DataSectorsService,
  ){}

  ngOnInit(): void {
    if(!this._dataServise.id){
      this.router.navigate(['/sectors'])
    }
  }

  handleLots(){
    this.lost = !this.lost;
    this.oExpenses = false;
    this.workers = false;
    this.payments = false;
  }

  handleOExpenses(){
    this.lost = false;
    this.oExpenses = !this.oExpenses;
    this.workers = false;
    this.payments = false;
  }

  handleWorkers(){
    this.lost = false;
    this.oExpenses = false;
    this.workers = !this.workers;
    this.payments = false;
  }

  handlePayments(){
    this.lost = false;
    this.oExpenses = false;
    this.workers = false;
    this.payments = !this.payments;
  }

}
