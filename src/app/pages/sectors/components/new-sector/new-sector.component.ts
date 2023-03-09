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

  createNewSector(){
    this._service.create(this.newSector.value).subscribe(res => console.log(res))
  }

  activateNewSector(){
    this.activateNewSectorButton = !this.activateNewSectorButton;
  }

}
