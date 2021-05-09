import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Codigo } from "../models/codigo";

@Injectable({
  providedIn: "root",
})
export class GrammarService {
  API_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  compile(codigo: Codigo): Observable<any> {
    return this.http.post(`${this.API_URL}/grammar/analizar`, codigo);
  }

  errors(): Observable<any> {
    return this.http.get(`${this.API_URL}/grammar/errores`);
  }

  symbols(): Observable<any> {
    return this.http.get(`${this.API_URL}/grammar/sym`);
  }

  astTree(): Observable<any> {
    return this.http.get(`${this.API_URL}/grammar/graph`);
  }
}
