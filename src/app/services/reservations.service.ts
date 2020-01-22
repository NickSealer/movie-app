import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get(this.apiUrl + 'reservations');
  }

  show(id: string){
    return this.http.get(this.apiUrl + 'reservations/' + id);
  }

  create(reservation){
    return this.http.post(this.apiUrl + 'reservations', reservation);
  }

  update(reservation){
    return this.http.put(this.apiUrl + 'reservations/' + reservation.id, reservation);
  }

  delete(id: string){
    return this.http.delete(this.apiUrl + 'reservations/' + id);
  }

}
