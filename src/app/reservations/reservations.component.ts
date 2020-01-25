import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: any = [];
  movies: any = [];
  reservation: any = null;
  newReservation: any = null;

  constructor(private reservationsService: ReservationsService, private moviesService: MoviesService) { }

  ngOnInit() {
    this.getReservations();
    this.getAvailables();
  }

  getReservations(){
    this.reservations = [];
    this.reservationsService.list().subscribe(res => {
      this.reservations = res;
    }, e => { console.log(e) })
  }

  getAvailables(){
    this.movies = [];
    this.moviesService.moviesAvailables().subscribe(res => {
      this.movies = res;
    }, e => { console.log(e);
     })
  }
   
  getReservation(id: string){
    this.reservation = [];
    this.reservationsService.show(id).subscribe(res =>{
      this.reservation = res;
    }, e => { console.log(e) })
  }
   
  createReservation(){
    this.reservationsService.create(this.newReservation).subscribe(res => {
      this.reservation = res;
      this.newReservation = null;
      this.getReservations();
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error){
        errorMessage += '<br>' + error[1];
      })
    })
  }

  updateReservation(reservation){
    this.reservationsService.update(reservation).subscribe(res => {
      this.reservation = res;
      this.reservation = null;
      this.getReservation(reservation.id);
      this.getReservations();
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error){
        errorMessage += '<br>' + error[1];
      })
    })
  }

  deleteReservation(id: string){
    if (window.confirm('Are you sure to delete ' + this.reservation.name + ' reservation?')) {
      this.reservationsService.delete(id).subscribe(res => {
        this.reservation = null;
        this.getReservations();
      }, e => { console.log(e) })
    }
  }

}
