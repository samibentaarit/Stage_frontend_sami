import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient) { }

  getAllAgences() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/agences', { headers });
  }

  getAllAgenceEtatActif() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/agences/activer', { headers });
  }

  addAgence(perso: {
    nom: string;
    nom_responsable: string;
    adresse: string;
    email: string;
    info_supp: string;
    etat: string;
    num: string[];
    
  }) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(environment.url + '/agences', perso, { headers });
  }

  archiverAgence(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/agences/' + id + '/archiver', {}, { headers });
  }

  updateAgence(id, perso) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/agences/' + id, perso, { headers });
  }
}
