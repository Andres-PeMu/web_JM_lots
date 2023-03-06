import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChargesService, getChargues } from 'src/app/services/Http/charges.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {

  @Input() charges?: getChargues[];
  @Output() load = new EventEmitter<boolean>();
  valueInputEdit: string = '';
  activateInputEdit: boolean = false;
  activateIdEdit: number | undefined;

  constructor(
    private _service: ChargesService,
  ){}

  handleinputEdit(event: any){
    const query = event.target.value.toLowerCase();
    this.valueInputEdit = query;
  }

  handleEdit(id: number){
    this.activateIdEdit = id;
  }

  handleSutmit(idChanges: number, idCostumer: number){
    const value = Number(this.valueInputEdit);
    const data = {
      "collectionValue": value,
      "id_customer": idCostumer
    };
    this._service.update(idChanges.toString(), data).subscribe( data => console.log(data));
    this.loanPage()
  }

  handleCancel(){
    this.activateIdEdit = undefined;
  }

  handleDelete(id: number){
    this._service.delete(id.toString()).subscribe( data => console.log(data));
    this.loanPage();
  }

  loanPage(){
    this.load.emit(true);
    this.activateIdEdit = undefined;
    this.load.emit(false);
  }

}
