import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) { }

  

  movies(day: string = ""){
    let params = new HttpParams();
    params = params.append("day", day);
    const options = {
      params: params,
    };
    return this.http.get(this.apiUrl + 'movies', options);
  }

  moviesAvailables(){
    return this.http.get(this.apiUrl + 'movies-availables');
  }

  show(id: string){
    return this.http.get(this.apiUrl + 'movies/' + id);
  }

  create(movie){
    return this.http.post(this.apiUrl + 'movies', movie);
  }

  update(movie){
    return this.http.put(this.apiUrl + 'movies/' + movie.id, movie);
  }

  delete(id: string){
    return this.http.delete(this.apiUrl + 'movies/' + id);
  }
  
}
