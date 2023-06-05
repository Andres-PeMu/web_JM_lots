import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createChargues {
  collectionValue: number;
  id_customer: number;
  date: string;
}

export interface resultnewChargues {
	ID_COBROS: number,
	VALOR_COBRO: number,
	ID_CLIENTE: number,
}

export interface getChargues {
  ID_COBROS: number;
  ID_CLIENTE: number;
  VALOR_COBRO: number;
  FECHA_PAGO: Date;
  NOMBRE: String;
  APELLIDO: String;
  IDENTIFICACION: String;
  CORREO: String;
  TELEFONO: String;
}

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  // getByCategory(categoryId: string, limit?: number, offset?: number){
  //   let params = new HttpParams();
  //   if (limit && offset != null) {
  //     params = params.set('limit', limit);
  //     params = params.set('offset', offset);
  //   }
  //   return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
        // .pipe(
      //   catchError((error: HttpErrorResponse) => {
      //     if (error.status === HttpStatusCode.Conflict) {
      //       return throwError('Algo esta fallando en el server');
      //     }
      //     if (error.status === HttpStatusCode.NotFound) {
      //       return throwError('El producto no existe');
      //     }
      //     if (error.status === HttpStatusCode.Unauthorized) {
      //       return throwError('No estas permitido');
      //     }
      //     return throwError('Ups algo salio mal');
      //   })
      // )
  // }

  getAll() {
    return this.http.get<getChargues[]>(`${this.apiUrl}/charges`)
  }

  getAndCustomerAll() {
    return this.http.get<getChargues[]>(`${this.apiUrl}/charges/customers`)
  }

  getOne(id: number) {
    return this.http.get<getChargues>(`${this.apiUrl}/charges/${id}`)
  }

  create(dto: createChargues) {
    return this.http.post<resultnewChargues>(`${this.apiUrl}/charges`, dto);
  }

  update(id: string, dto: createChargues) {
    return this.http.patch<createChargues>(`${this.apiUrl}/charges/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/charges/${id}`);
  }
}

