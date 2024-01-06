import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createWorker {
  "identification": number,
  "name": string,
  "lastName": string,
  "email": string,
  "id_sectors": number,
  "phone": number,
}

export interface getWorkers {
  "ID_TRABAJADORES": number,
  "IDENTIFICACION": number,
  "NOMBRE": string,
  "APELLIDO": string,
  "CORREO": string,
  "ID_SECTOR"?: number
  "TELEFONO"?: number
}

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private apiUrl = `https://jm-api.onrender.com/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getWorkers[]>(`${this.apiUrl}/workers`)
  }

  getOne(id: number) {
    return this.http.get<getWorkers>(`${this.apiUrl}/workers/${id}`)
  }

  getOneSector(id: number) {
    return this.http.get<getWorkers[]>(`${this.apiUrl}/workers/sector/${id}`)
  }

  create(dto: createWorker) {
    return this.http.post<createWorker>(`${this.apiUrl}/workers`, dto);
  }

  update(id: string, dto: createWorker) {
    return this.http.patch<createWorker>(`${this.apiUrl}/workers/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/workers/${id}`);
  }

}
