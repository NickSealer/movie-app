import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ReservationsComponent } from './reservations/reservations.component';

import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'reservations', component: ReservationsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ReservationsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
