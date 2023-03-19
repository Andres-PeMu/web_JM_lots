import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createOe {
	"expenseType": string,
	"hourValue": number,
	"hourValueWorked": number,
	"idWorker": number,
	"idSector": number,
	"fullValue": number,
}

export interface getOe {
  "ID_GASTOS": number,
  "TIPO_GASTO": string,
  "VALOR_HORA": number,
  "HORAS_TRABAJADAS": number,
  "ID_TRABAJADOR": number,
  "ID_SECTOR": number,
  "VALOR_TOTAL": number,
}

@Injectable({
  providedIn: 'root'
})
export class OpeExpensesService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getOe[]>(`${this.apiUrl}/oe/`);
  }

  getOne(id: number) {
    return this.http.get<getOe>(`${this.apiUrl}/oe/${id}`);
  }

  getOneSector(id: number) {
    return this.http.get<getOe[]>(`${this.apiUrl}/oe/sector/${id}`);
  }

  create(dto: createOe) {
    return this.http.post<createOe>(`${this.apiUrl}/oe`, dto);
  }

  update(id: string, dto: createOe) {
    return this.http.patch<createOe>(`${this.apiUrl}/oe/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/oe/${id}`);
  }

}
