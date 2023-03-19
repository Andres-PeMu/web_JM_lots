import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createCustomer {
  "name": string,
  "lastName": string,
  "identification": number,
  "email": string,
  "phone": number,
}

export interface getCustomers {
  "ID_CLIENTES": number,
  "NOMBRE": string,
  "APELLIDO": string,
  "IDENTIFICACION": number,
  "CORREO": string,
  "ID_VENCOCLI"?: number,
  "TELEFONO": number,
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getCustomers[]>(`${this.apiUrl}/customer`)
  }

  getOne(id: number) {
    return this.http.get<getCustomers>(`${this.apiUrl}/customer/${id}`)
  }

  create(dto: createCustomer) {
    return this.http.post<createCustomer>(`${this.apiUrl}/customer`, dto);
  }

  update(id: string, dto: createCustomer) {
    return this.http.patch<createCustomer>(`${this.apiUrl}/customer/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/customer/${id}`);
  }
}
