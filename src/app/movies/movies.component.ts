import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: any = [];
  movie: any = null;
  newMovie: any = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movies = [];
    this.moviesService.list().subscribe(res => {
      this.movies = res;
    }, e => { console.log(e) })
  }
   
  getMovie(id: string){
    this.movie = [];
    this.moviesService.show(id).subscribe(res =>{
      this.movie = res;
    }, e => { console.log(e) })
  }
   
  createMovie(){
    this.moviesService.create(this.newMovie).subscribe(res => {
      this.movie = res;
      this.newMovie = null;
      this.getMovies();
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error){
        errorMessage += '<br>' + error[1];
      })
    })
  }

  updateMovie(movie){
    this.moviesService.update(movie).subscribe(res => {
      this.movie = res;
      this.movie = null;
      this.getMovie(movie.id);
      this.getMovies();
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error){
        errorMessage += '<br>' + error[1];
      })
    })
  }

  deleteMovie(id: string){
    if (window.confirm('Are you sure to delete ' + this.movie.name + ' movie?')) {
      this.moviesService.delete(id).subscribe(res => {
        this.movie = null;
        this.getMovies();
      }, e => { console.log(e) })
    }
  }

}
