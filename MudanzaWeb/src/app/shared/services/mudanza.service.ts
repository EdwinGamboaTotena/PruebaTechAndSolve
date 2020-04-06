import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Execute } from '../models/Execute';
import { apiExecute } from '../config/endPoints';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MudanzaService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Execute[]> {
    return this.httpClient.get(apiExecute, httpOptions).pipe(
      map((response: any) => response.lstExecute as Execute[]));
  }

  saveExecute(execute: Execute): Observable<any> {
    return this.httpClient.post(apiExecute, execute, httpOptions).pipe(
      map((response: any) => response));
  }

  calculateOutput(id: number): Observable<any> {
    return this.httpClient.get(`${apiExecute}/${id}`, httpOptions).pipe(
      map((response: any) => response));
  }

}
