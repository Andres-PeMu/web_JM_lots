import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSectorsService {

  id:string = '';
  name:string = '';
  numberLot: number = 0;

  constructor() { }

  saveId(id: string){
    this.id = id;
  }

  saveName(name: string){
    this.name = name;
  }

  saveNumber(numberLot: number){
    this.numberLot = numberLot;
  }

}
