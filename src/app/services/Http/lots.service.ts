import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface createLot {
	"lotNumber": number,
	"lotValue"?: number,
	"id_sector"?: number,
	"id_customer"?: number,
}

export interface deleteIdLot {
  id: string;
}

export interface getLots {
  "ID_LOTES": number,
  "NUMERO_LOTE": number,
  "VALOR_LOTE"?: number,
  "ID_SECTOR": number,
  "ID_CLIENTE"?: number,
}

@Injectable({
  providedIn: 'root'
})
export class LotsService {

  private apiUrl = `http://localhost:3001/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<getLots[]>(`${this.apiUrl}/lots/`);
  }

  getOne(id: number) {
    return this.http.get<getLots[]>(`${this.apiUrl}/lots/${id}`);
  }

  getOneSector(id: number) {
    return this.http.get<getLots[]>(`${this.apiUrl}/lots/sector/${id}`);
  }

  getOnelotAndSector(numLot: number, idSector: number) {
    return this.http.get<getLots[]>(`${this.apiUrl}/lots/lot/${numLot}/${idSector}`);
  }

  create(dto: createLot) {
    return this.http.post<getLots>(`${this.apiUrl}/lots`, dto);
  }

  update(id: string, dto: createLot) {
    return this.http.patch<getLots>(`${this.apiUrl}/lots/${id}`, dto);

  }

  delete(id: string) {
    return this.http.delete<deleteIdLot>(`${this.apiUrl}/lots/${id}`);
  }

}
