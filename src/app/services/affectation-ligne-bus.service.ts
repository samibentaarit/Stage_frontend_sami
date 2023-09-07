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
  getAllAffectationsActiver() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/api/affectations/activer', { headers });
  }
  createAffectations(ligne: AffectationLigneBus): Observable<AffectationLigneBus>{
    return this.http.post<AffectationLigneBus>(this.API, ligne);
  }
  archiverAffectationBusLigne(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/api/affectations-eleve-ligne-bus/' + id + '/archiver', { headers })
  }
  updateAffectationLigneBus(id: number, affectationLigneBus: AffectationLigneBus): Observable<AffectationLigneBus> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<AffectationLigneBus>(`${environment.url}/affectation-ligne-bus/${id}`, affectationLigneBus, { headers });
  }

}
