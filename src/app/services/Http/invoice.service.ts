import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createInvoice {
  "sectorId": number,
  "customerId": number,
  "concept": string,
  "idVencocli": number,
}

export interface getInvoice {
  APELLIDO: string;
  CONCEPTO: string;
  CORREO: string;
  FECHA_GUARDADA: string;
  FECHA_PAGO: string;
  IDENTIFICACION: number;
  ID_CLIENTE: number;
  ID_COBROS: number;
  ID_FACTURA: number;
  ID_SECTOR: number;
  ID_VENCOCLI: number;
  ID_VENTAS: number;
  NAME: string;
  NOMBRE: string;
  NUMERO_FACTURA: number;
  NUMERO_LOTE: number;
  TELEFONO: number;
  VALOR_COBRO: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = `https://jm-api.onrender.com/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getInvoice[]>(`${this.apiUrl}/invoise`)
  }

  getOne(id: number) {
    return this.http.get<getInvoice[]>(`${this.apiUrl}/invoise/${id}`)
  }

  getOneVencocli(id: number) {
    return this.http.get<getInvoice[]>(`${this.apiUrl}/invoise/vencocli/${id}`)
  }

  getOneCustomer(id: number) {
    return this.http.get<getInvoice[]>(`${this.apiUrl}/invoise/customer/${id}`)
  }

  create(dto: createInvoice) {
    return this.http.post<createInvoice>(`${this.apiUrl}/invoise`, dto);
  }

  update(id: string, dto: createInvoice) {
    return this.http.patch<createInvoice>(`${this.apiUrl}/invoise/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/invoise/${id}`);
  }
}

