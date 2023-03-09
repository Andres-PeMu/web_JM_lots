import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createSectors {
	"name": string,
	"lotNumber": number,
}

export interface getSectors {
  "ID_SECTOR": number,
  "NAME": string,
  "NUMERO_LOTE": number,
}

// export interface getPaymentsAndWorkerAndOe {
//   "ID_PAGOS": number,
//   "VALOR_PAGO": number,
//   "ID_TRABAJOR": number,
//   "ID_GASTOS_OPERACIONES": number,
//   "IDENTIFICACION": number,
//   "NOMBRE": string,
//   "APELLIDO": string,
//   "CORREO": string,
//   "TIPO_GASTO": string,
//   "VALOR_HORA": number,
//   "HORAS_TRABAJADAS": number,
//   "VALOR_TOTAL": number,
// }

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getSectors[]>(`${this.apiUrl}/sectors`);
  }

  // getAndWorkerAndOEAll() {
  //   return this.http.get<getPaymentsAndWorkerAndOe[]>(`${this.apiUrl}/payments/worker/oe`)
  // }

  getOne(id: number) {
    return this.http.get<getSectors>(`${this.apiUrl}/sectors/${id}`);
  }

  create(dto: createSectors) {
    return this.http.post<createSectors>(`${this.apiUrl}/sectors`, dto);
  }

  update(id: string, dto: createSectors) {
    return this.http.patch<createSectors>(`${this.apiUrl}/sectors/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/sectors/${id}`);
  }

}
