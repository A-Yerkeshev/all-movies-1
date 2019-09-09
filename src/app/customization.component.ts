/* Component is responsible to organize the data recieved from Data Service according to user preferences. Component
keeps track of user's preferences through usage of local storage of the browser. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';

// Class that is responsible for analysis of data from local storage and predicting the properties of movies
// that user might be interested in.
class BrainClass {
  /* Function to predict the genre of movies user is interested in
    Args: recentMovies - array of recently viewed movies
    Output: genre name */
  predictGenre(recentMovies: Array<Movie>): string | Array<string> {
    let genres: object = {};

    interface predict {
      genre: string | Array<string>,
      occurencies: number
    }
    let predict: predict = {
      genre: null,
      occurencies: 0
    }

    // Fill the ganres object with genre - occurencies key - value pairs
    recentMovies.forEach(function(movie) {
      const movieGenres: Array<string> = movie.Genre.split(', ');
      movieGenres.forEach(function(genre) {
        // If genre already occured before, increment the value by 1
        if (genres[genre]) {
          genres[genre] += 1;
        } else {
          // Otherwise add new genre and set value to 1
          genres[genre] = 1;
        }
      })
    })

    // Iterate through genres object and select genre(-s) with highes occurency rate
    for (let genre in genres) {
      if (genres[genre] > predict.occurencies) {
        // If current genre occured more times than highest one - set current genre as highest occured
        predict.genre = genre;
        predict.occurencies = genres[genre];
      } else if (genres[genre] = predict.occurencies) {
        // If current genre occured same amout of times as highest one - add current genre to array
        if (Array.isArray(predict.genre)) {
          predict.genre.push(genre);
        } else {
          const currentGenre: string = predict.genre;
          predict.genre = [currentGenre, genre];
        }
      }
    }

    return predict.genre
  }
}
const Brain = new BrainClass;
const dataService = new DataService;
Brain.predictGenre(dataService.getRecentMovies());

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
class CustomizationComponent {
  recentMovies: Array<Movie>;

  constructor(private dataService: DataService) {
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
