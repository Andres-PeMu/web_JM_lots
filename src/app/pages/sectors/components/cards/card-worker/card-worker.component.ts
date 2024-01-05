import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { WorkersService, getWorkers } from 'src/app/services/Http/workers.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

@Component({
  selector: 'app-card-worker',
  templateUrl: './card-worker.component.html',
  styleUrls: ['./card-worker.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class CardWorkerComponent implements OnInit {

  @Output() readOECard = new EventEmitter()

  formEditWorker!: FormGroup;

  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  modalString: string = '';
  seeModal: boolean = false;

  isExpanded = false;

  workers: getWorkers[] = [];

  constructor(
    private _serviceWorker: WorkersService,
    private dataService: DataSectorsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.formEditWorker = this.fb.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.dataService.id)
    this._serviceWorker.getOneSector(id).subscribe(res => {
      this.workers = res;
    })
    this.isExpanded = false;
    this.activateIdEdit = undefined;
    this.cdr.detectChanges();
  }

  handleinputEdit(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(worker: getWorkers) {
    this.activateIdEdit = worker.ID_TRABAJADORES;
    this.formEditWorker.controls['identification'].setValue(worker.IDENTIFICACION);
    this.formEditWorker.controls['name'].setValue(worker.NOMBRE);
    this.formEditWorker.controls['lastName'].setValue(worker.APELLIDO);
    this.formEditWorker.controls['email'].setValue(worker.CORREO);
    this.formEditWorker.controls['phone'].setValue(worker.TELEFONO);
  }

  handleSet() {
    this.formEditWorker.controls['identification'].setValue('');
    this.formEditWorker.controls['name'].setValue('');
    this.formEditWorker.controls['lastName'].setValue('');
    this.formEditWorker.controls['email'].setValue('');
    this.formEditWorker.controls['phone'].setValue('');
  }

  handleSaveNew() {
    let data = this.formEditWorker.value;
    const id_sectors = Number(this.dataService.id)
    data = {
      ...data,
      id_sectors,
    }
    data = this.convertToUppercase(data);
    this._serviceWorker.create(data)
      .subscribe(res => {
        this.handleSet();
        this.ngOnInit();
        this.cdr.detectChanges();
      }
      );
  }

  handleEditSutmit(idWorker: number) {
    let data = this.formEditWorker.value;
    const id_sectors = Number(this.dataService.id)
    data = {
      ...data,
      id_sectors,
    }
    data = this.convertToUppercase(data);
    this._serviceWorker.update(idWorker.toString(), data)
      .subscribe(res => {
        this.handleSet();
        this.ngOnInit();
        this.cdr.detectChanges();
      });
  }

  handleCancel() {
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number) {
    this._serviceWorker.delete(id.toString())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.modalString = 'el trabajador tiene gastos operacionales, para eliminar borrar los pagos realizados';
          this.seeModal = !this.seeModal;
          return of(null);
        })
      )
      .subscribe(res => {
        this.handleSet();
        this.ngOnInit();
        this.cdr.detectChanges();
        !this.seeModal ? this.ngOnInit() : console.log(res);
      })
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

  handleRead() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }

  handleNewPayment() {
    this.handleSet();
    this.isExpanded = !this.isExpanded;
  }

  closeMode() {
    this.seeModal = !this.seeModal;
  }

}
