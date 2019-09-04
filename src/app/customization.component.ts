/* Component is responsible to organize the data recieved from Data Service according to user preferences. Component
keeps track of user's preferences through usage of local storage of the browser and cookies. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
class CustomizationComponent {
  recentMovies: Array<Movie>;

  constructor(private dataService: DataService,) {
    /* If this is the first time user is using the app, define parameter in local storage to keep track of user's
    recently viewed movies */
    const recentMoviesNum: string = localStorage.getItem('recentMoviesNum');
    if (recentMoviesNum == undefined) {
      localStorage.setItem('recentMoviesNum', '0');
    }

    this.recentMovies = dataService.getRecentMovies();
  }

  /* Function to set current movie in data collector
    Args: movie - movie to set current */
  setCurrentMovie(movie: Movie): void {
    this.dataService.setCurrentMovie(movie);
  }

}

export { CustomizationComponent }
