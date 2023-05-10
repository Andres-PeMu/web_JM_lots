import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createInvoiceGo {
  sectorId: number;
  workerId: number;
  concept: string;
  idGop: number;
}

export interface getInvoiceGo {
  ID_FACTURA_PAGO: number;
  NUMERO_FACTURA: number;
  FECHA_GUARDADA: string;
  ID_SECTOR: number;
  ID_TRAJADOR: number;
  CONCEPTO: string;
  ID_GOP: number;
  NAME: number;
  NUMERO_LOTE: number;
  ID_TRABAJADORES: number;
  IDENTIFICACION: number;
  NOMBRE: string;
  APELLIDO: string;
  CORREO: string;
  TELEFONO: string;
  ID_GASTO_O: number;
  ID_PAGO: number;
  ID_TRABAJADOR: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceGopService {


  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getInvoiceGo[]>(`${this.apiUrl}/invoisegop`)
  }

  getOne(id: number) {
    return this.http.get<getInvoiceGo[]>(`${this.apiUrl}/invoisegop/${id}`)
  }

  getOnegop(id: number) {
    return this.http.get<getInvoiceGo[]>(`${this.apiUrl}/invoise/invoisegop/${id}`)
  }

  create(dto: createInvoiceGo) {
    return this.http.post<createInvoiceGo>(`${this.apiUrl}/invoisegop`, dto);
  }

  update(id: string, dto: createInvoiceGo) {
    return this.http.patch<createInvoiceGo>(`${this.apiUrl}/invoisegop/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/invoisegop/${id}`);
  }
}
