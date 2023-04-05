import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createSalesChargesCostomersSchema {
  idSales: number,
  idCharges: number,
  idCustomers: number,
}

export interface getSachaco {
  ID_VENCOCLI: number,
  ID_VENTAS: number,
  ID_COBROS: number,
  ID_CLIENTE: number,
}

export interface getSalesChargesCostomersSchema {
  ID_VENCOCLI: number,
  ID_VENTAS: number,
  ID_COBROS: number,
  ID_CLIENTE: number,
  VALOR_VENTA: number,
  ID_LOTES: number,
  ID_CLIENTES: number,
  NOMBRE: string,
  APELLIDO: string,
  IDENTIFICACION: string,
  CORREO: string,
  TELEFONO: number,
  VALOR_COBRO: number,
  FECHA_PAGO?: string,
}

@Injectable({
  providedIn: 'root'
})
export class SalesChargesCustomersService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getSachaco[]>(`${this.apiUrl}/sachacus/`);
  }

  getOneLots(id: number) {
    return this.http.get<getSalesChargesCostomersSchema[]>(`${this.apiUrl}/sachacus/lot/${id}`);
  }

  getOneCustomers(id: number) {
    return this.http.get<getSalesChargesCostomersSchema[]>(`${this.apiUrl}/sachacus/customers/${id}`);
  }

  getOneSalesr(id: number) {
    return this.http.get<getSalesChargesCostomersSchema[]>(`${this.apiUrl}/sachacus/sales/${id}`);
  }

  create(dto: createSalesChargesCostomersSchema) {
    return this.http.post<createSalesChargesCostomersSchema>(`${this.apiUrl}/sachacus/`, dto);
  }

  update(id: string, dto: createSalesChargesCostomersSchema) {
    return this.http.patch<createSalesChargesCostomersSchema>(`${this.apiUrl}/sachacus/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/sachacus/${id}`);
  }
}
