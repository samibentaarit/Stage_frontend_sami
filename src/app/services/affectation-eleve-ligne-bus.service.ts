import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AffectationEleveLigneBus } from 'app/models/affectationEleveLigneBus';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffectationEleveLigneBusService {
  private API = environment.url + '/api/affectations-eleve-ligne-bus';
  constructor(private http: HttpClient) { }
  
  createAffectationEleveLigneBus(ligne: AffectationEleveLigneBus): Observable<AffectationEleveLigneBus>{
    return this.http.post<AffectationEleveLigneBus>(this.API, ligne);
  }

  getAffectationEleveLigneBus() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/api/affectations-eleve-ligne-bus', { headers });
  }
}
