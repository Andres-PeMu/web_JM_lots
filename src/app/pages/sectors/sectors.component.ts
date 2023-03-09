import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectorsService, getSectors } from 'src/app/services/Http/sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  getSectors: getSectors[] = [];
  sectors: getSectors[] = []
  nuevo: any;

  constructor(
    private _service: SectorsService
  ) {
  }

  ngOnInit(): void {
    this._service.getAll().subscribe(res => {
      this.getSectors = res;
      this.sectors = res;
    });
  }

  SectorSelec = new FormControl('', Validators.required);
  form = new FormGroup({
    sectors: this.SectorSelec,
  });

}
