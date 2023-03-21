import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createOpm {
  "idOE": number,
  "idPayment": number,
  "idWorker": number,
}

export interface getOpm {
  "ID_GOP": number,
  "ID_GASTO_O": number,
  "ID_PAGO": number,
  "ID_TRABAJADOR": number,
}

export interface getPaymentsAndWorkerAndOe {
  "ID_GOP": number,
  "ID_PAGOS": number,
  "VALOR_PAGO": number,
  "ID_TRABAJOR": number,
  "ID_GASTOS_OPERACIONES": number,
  "IDENTIFICACION": number,
  "NOMBRE": string,
  "APELLIDO": string,
  "CORREO": string,
  "TIPO_GASTO": string,
  "VALOR_HORA": number,
  "HORAS_TRABAJADAS": number,
  "VALOR_TOTAL": number,
  "FECHA_DE_PAGO"?: string,
}

@Injectable({
  providedIn: 'root'
})
export class OpwService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getOpm[]>(`${this.apiUrl}/opw/`);
  }

  getOneOe(id: number) {
    return this.http.get<getPaymentsAndWorkerAndOe[]>(`${this.apiUrl}/opw/oe/${id}`);
  }

  getOneWorker(id: number) {
    return this.http.get<getPaymentsAndWorkerAndOe[]>(`${this.apiUrl}/opw/worker/${id}`);
  }

  create(dto: createOpm) {
    return this.http.post<createOpm>(`${this.apiUrl}/opw`, dto);
  }

  update(id: string, dto: createOpm) {
    return this.http.patch<createOpm>(`${this.apiUrl}/opw/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/opw/${id}`);
  }
}
