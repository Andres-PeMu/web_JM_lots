import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSectorsService {

  id:string = ''

  constructor() { }

  sabeId(id: string){
    this.id = id;
  }

}
