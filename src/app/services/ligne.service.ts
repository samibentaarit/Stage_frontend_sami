import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Station } from "app/models/Station";
import { Ligne } from "app/models/ligne";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  getAllLigneEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/lignes', { headers });
  }

  archiverLigne(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/lignes/' + id + '/archiver', { headers })
  }

  updateLigne(id: number, ligne: Ligne) {
    throw new Error('Method not implemented.');
  }
  private API = environment.url + '/lignes';
  constructor(private http: HttpClient) { }

  createLigne(ligne: Ligne): Observable<Ligne>{
    return this.http.post<Ligne>(this.API, ligne);
  }

//stations
listLigne() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.get<Ligne[]>(environment.url + '/lignes', { headers });
}

//stations
listStation() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Station[]>(environment.url + '/stations', { headers });
  }
}