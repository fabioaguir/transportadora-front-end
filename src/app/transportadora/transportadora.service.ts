import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transportadora } from './transportadora.model';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {

  private headers = {headers:  new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  })};

  constructor(
    private http: HttpClient
  ) {}

  getAll(route: string) {
    return this.http.get<any[]>(route, this.headers);
  }

  create(route: string, transportadora: Transportadora) {
    return this.http.post<any>(route, transportadora, this.headers);
  }

  update(route: string, transportadora: Transportadora) {
    return this.http.put<any>(route + '/' + transportadora.id, transportadora, this.headers);
  }

  delete(route: string, id: number) {
    return this.http.delete(route + '/' + id, this.headers);
  }

  getHttp() {
    return this.http;
  }

  getHeadrs() {
    return this.headers;
  }
}
