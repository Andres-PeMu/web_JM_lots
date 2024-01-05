import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { SectorsService } from 'src/app/services/Http/sectors.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.component.html',
  styleUrls: ['./new-sector.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class NewSectorComponent {
  newSector: FormGroup;

  activateNewSectorButton: boolean = false;

  constructor(
    private _service: SectorsService,
    private messageService: ModalService
  ) {
    this.newSector = new FormGroup({
      name: new FormControl('', Validators.required),
      lotNumber: new FormControl('', Validators.required),
    });
  }

  createNewSector() {
    let data = this.newSector.value;
    data = this.convertToUppercase(data);
    this._service
      .create(data)
      .pipe(
        catchError((error) => {
          this.messageService.showMessage(
            `Error en la operación al crear el Sector ${error.error.message}`,
            'error'
          );
          return [];
        })
      )
      .subscribe((res) => {
        this.messageService.showMessage(
          'Operación exitosa el cliente se ha creado',
          'success'
        );
        window.location.reload();
      });
  }

  activateNewSector() {
    this.activateNewSectorButton = !this.activateNewSectorButton;
  }

  convertToUppercase(object: { [x: string]: string }) {
    for (let propiedad in object) {
      if (typeof object[propiedad] === 'string') {
        object[propiedad] = object[propiedad].replace(/\s+/g, '_');
        object[propiedad] = object[propiedad].toUpperCase();
      }
    }
    return object;
  }
}
