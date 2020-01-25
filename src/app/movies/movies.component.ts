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
  imageUrl: string = "/assets/images/movie.jpg";
  fileToUpload: File = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getAvailables();
  }

  getMovies(){
    this.movies = [];
    this.moviesService.movies().subscribe(res => {
      this.movies = res;
    }, e => { console.log(e) })
  }

  searchMovieByDay(){
    var day = (<HTMLInputElement>document.getElementById("day")).value;
    this.movies =[];
    this.moviesService.movies(day).subscribe(res =>{
      this.movies = res;
    }, e => { console.log(e) })
  }

  getAvailables(){
    this.movies = [];
    this.moviesService.moviesAvailables().subscribe(res => {
      this.movies = res;
    }, e => { console.log(e);
     })
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

  fileInput(file: FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload);
    
  }

}
