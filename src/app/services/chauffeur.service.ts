import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  constructor(private http: HttpClient) { }

  getAllChauffeurs() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/chauffeurs', { headers });
  }

  getAllChauffeurEtatActif() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/chauffeurs/activer', { headers });
  }

  addChauffeur(perso: {
    nom: string;
    prenom: string;
    email: string;
    
    etat: string;
    num: string[];
    
  }) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(environment.url + '/chauffeurs', perso, { headers });
  }

  archiverChauffeur(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/chauffeurs/' + id + '/archiver', {}, { headers });
  }

  updateChauffeur(id, perso) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/chauffeurs/' + id, perso, { headers });
  }
}
