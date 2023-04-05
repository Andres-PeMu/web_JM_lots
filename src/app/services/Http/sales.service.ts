import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createSale {
	salesValue: number;
	id_lots: number;
	id_customer: number;
}

export interface getSales {
  ID_VENTAS: number;
  VALOR_VENTA: number;
  ID_LOTES: number;
  ID_CLIENTE: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getSales[]>(`${this.apiUrl}/sales/`)
  }

  getOne(id: number) {
    return this.http.get<getSales>(`${this.apiUrl}/sales/${id}`)
  }

  getOnelot(id: number) {
    return this.http.get<getSales[]>(`${this.apiUrl}/sales/lot/${id}`)
  }

  create(dto: createSale) {
    return this.http.post<createSale>(`${this.apiUrl}/sales/`, dto);
  }

  update(id: string, dto: createSale) {
    return this.http.patch<createSale>(`${this.apiUrl}/sales/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/sales/${id}`);
  }

}
