import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transportadora } from './transportadora.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {

  private route : string = environment.api + 'transportadora';

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

  create(transportadora: Transportadora) {
    return this.http.post<any>(this.route, JSON.stringify(transportadora), this.headers);
  }

  update(transportadora: Transportadora) {
    return this.http.put<any>(this.route + '/' + transportadora.id, JSON.stringify(transportadora), this.headers);
  }

  delete(id: number) {
    return this.http.delete(this.route + '/' + id, this.headers);
  }

  getHttp() {
    return this.http;
  }

  getHeadrs() {
    return this.headers;
  }
}
