import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from 'app/models/busModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }

  getAllBuss() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bus[]>(environment.url + '/bus', { headers });
  }

  getAllBusEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/bus/activer', { headers });
  }

  addBus(bus: {
    num_bus: string;
    marque_bus: string;
    immatriculation_bus: string;
    nb_places: number;
    etat: string;
  }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bus>(environment.url + '/bus', bus, { headers });
  }

  archiverBus(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/bus/' + id + '/archiver', { headers });
  }

  updateBus(id: number, bus: Bus) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Bus>(environment.url + '/bus/' + id, bus, { headers });
  }

  deleteBus(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/bus/' + id, { headers });
  }

  // Add more methods as needed

}