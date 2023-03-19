import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectorsService } from 'src/app/services/Http/sectors.service';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.component.html',
  styleUrls: ['./new-sector.component.scss']
})
export class NewSectorComponent {

  newSector: FormGroup;

  activateNewSectorButton: boolean = false

  constructor(
    private _service: SectorsService,
  ) {
    this.newSector = new FormGroup({
      name: new FormControl('', Validators.required),
      lotNumber: new FormControl('', Validators.required)
    });
  }

  createNewSector() {
    let data = this.newSector.value;
    data = this.convertToUppercase(data);
    this._service.create(data).subscribe(res => {
      console.log(res)
      window.location.reload()
    });
  }

  activateNewSector() {
    this.activateNewSectorButton = !this.activateNewSectorButton;
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
