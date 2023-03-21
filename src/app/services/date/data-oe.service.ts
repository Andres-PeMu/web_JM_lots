import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataOEService {

  id:string = ''

  constructor() { }

  sabeId(id: string){
    this.id = id;
  }
}
