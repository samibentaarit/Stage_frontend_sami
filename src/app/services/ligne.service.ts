import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Station } from "app/models/Station";
import { Chauffeur } from "app/models/chauffeur";
import { Ligne } from "app/models/ligne";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  getAllLigneEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/lignes/activer', { headers });
  }

  archiverLigne(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/lignes/' + id + '/archiver', { headers })
  }

  updateLigne(id: number, ligne: Ligne) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.put<Ligne>(environment.url + '/ligne/' + id, ligne, { headers });
    }
  private API = environment.url + '/lignes';
  constructor(private http: HttpClient) { }

  createLigne(ligne: Ligne): Observable<Ligne>{
    return this.http.post<Ligne>(this.API, ligne);
  }

 


//lignes
listLigne() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.get<Ligne[]>(environment.url + '/lignes/activer', { headers });
}

//stations
listStation() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Station[]>(environment.url + '/stations/activer', { headers });
  }

//chauffeurs
listChauffeur() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.get<Chauffeur[]>(environment.url + '/chauffeurs/activer', { headers });
}

}