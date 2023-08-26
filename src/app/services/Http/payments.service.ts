import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createPayments {
  "paymentValue": number,
  "idWorker": number,
  "idOperationalExpenses": number,
  PaymentDate: string,
}

export interface getPayments {
  "ID_PAGOS": number,
  "VALOR_PAGO": number,
  "ID_TRABAJOR": number,
  "ID_GASTOS_OPERACIONES": number,
  "FECHA_DE_PAGO"?: string,
}

export interface getPaymentsAndWorkerAndOe {
  ID_PAGOS: number;
  VALOR_PAGO: number;
  ID_TRABAJOR: number;
  ID_GASTOS_OPERACIONES: number;
  IDENTIFICACION: number;
  NOMBRE: string;
  APELLIDO: string;
  CORREO: string;
  TIPO_GASTO: string;
  VALOR_HORA: number;
  HORAS_TRABAJADAS: number;
  VALOR_TOTAL: number;
  FECHA_DE_PAGO: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getPayments[]>(`${this.apiUrl}/payments`)
  }

  getAndWorkerAndOEAll() {
    return this.http.get<getPaymentsAndWorkerAndOe[]>(`${this.apiUrl}/payments/worker/oe`)
  }

  getAndWorker(id: number) {
    return this.http.get<getPayments[]>(`${this.apiUrl}/payments/worker/${id}`)
  }

  getOne(id: number) {
    return this.http.get<getPayments>(`${this.apiUrl}/payments/${id}`)
  }

  create(dto: createPayments) {
    return this.http.post<getPayments>(`${this.apiUrl}/payments`, dto);
  }

  update(id: string, dto: createPayments) {
    return this.http.patch<createPayments>(`${this.apiUrl}/payments/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/payments/${id}`);
  }

}
