import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AffectationLigneBus } from 'app/models/affectation-ligne-bus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffectationLigneBusService {
  private API = environment.url + '/api/affectations';

  constructor(private http: HttpClient) { }
  getAllAffectations() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/api/affectations', { headers });
  }
  createAffectations(ligne: AffectationLigneBus): Observable<AffectationLigneBus>{
    return this.http.post<AffectationLigneBus>(this.API, ligne);
  }

}
