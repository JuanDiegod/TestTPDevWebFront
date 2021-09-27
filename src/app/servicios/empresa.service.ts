import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { ResponseEmpresa } from '../modelos/responseEmpresa';
import { Observable } from 'rxjs';
import { Empresa } from '../modelos/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private response: ResponseEmpresa = { code: "", message: "", empresas: [] };
  private url = '/api/empresa/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  public getEmpresa(numDocumento: string): Observable<ResponseEmpresa> {    
    return this.http.get<ResponseEmpresa>(this.url + numDocumento);
  }

  public updateEmpresa(body: Empresa): Observable<ResponseEmpresa> {
    return this.http.put<ResponseEmpresa>(this.url, body, this.httpOptions);
  }
}
