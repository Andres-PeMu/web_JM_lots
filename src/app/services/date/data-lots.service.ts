import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLotsService {

  id: string = ''
  lotValue: number = 0

  constructor() { }

  sabeId(id: string){
    this.id = id;
  }

  sabeLotValue(lotValue: number){
    this.lotValue = lotValue;
  }

}
