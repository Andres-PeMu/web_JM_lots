import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SectorsService, getSectors } from 'src/app/services/Http/sectors.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { ShellOverviewComponent } from '../../shell-overview/shell-overview.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-sector',
  templateUrl: './card-sector.component.html',
  styleUrls: ['./card-sector.component.scss']
})
export class CardSectorComponent implements OnInit {

  formEditSector!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  Sectors: getSectors[] = []

  constructor(
    private _service: SectorsService,
    private _dataSectors: DataSectorsService,
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private  router: Router,
  ) {
    this._service.getAll().subscribe(res => this.Sectors = res)
  }
  ngOnInit(): void {
    this.formEditSector = this.fb.group({
      name: ['', Validators.required],
      lotNumber: ['', Validators.required]
    });
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleSee(id: number, nameSector: string, lotsNumber: number) {
    this._dataSectors.saveId(id.toString());
    this._dataSectors.saveName(nameSector);
    this._dataSectors.saveNumber(lotsNumber);
    this.router.navigate(['/sectors/', nameSector]);
  }

  handleEdit(id: number) {
    this.activateIdEdit = id;
  }

  handleSutmit(idSector: number) {
    let data = this.formEditSector.value;
    data = this.convertToUppercase(data);
    this._service.update(idSector.toString(), data).subscribe(res => console.log(res));
    window.location.reload();
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    this._dataSectors.saveId(id.toString())
    this._bottomSheet.open(ShellOverviewComponent);
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

}
