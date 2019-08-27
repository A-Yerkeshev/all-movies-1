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
    // Store viewed movie title in local storage
    const recentMoviesNum: number = parseInt(localStorage.getItem('recentMoviesNum'));
    localStorage.setItem((Date.now()).toString(), movie.Title);
    // If number of movies stored in local storage is 15 - remove oldest movie - otherwise increment
    // recentMoviesNum by one.
    if (recentMoviesNum == 15) {
      let oldest: number = 0;
      for (let i=0; i<localStorage.length; i++) {
        const utcDate: number = parseInt(localStorage.key(i));
        if (utcDate && utcDate > oldest) {
          oldest = utcDate;
        }
      }
      localStorage.removeItem(oldest.toString());
    } else {
      localStorage.setItem('recentMoviesNum', (recentMoviesNum + 1).toString());
    }
  }

}

export { CustomizationComponent }
