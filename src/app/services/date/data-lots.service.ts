import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLotsService {

  id:string = ''

  constructor() { }

  sabeId(id: string){
    this.id = id;
  }

}
