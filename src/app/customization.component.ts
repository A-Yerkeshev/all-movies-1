/* Component is responsible to organize the data recieved from Data Service according to user preferences. Component
keeps track of user's preferences through usage of local storage of the browser. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';

/* Prediction function used by Brain to make predictions of genre, production and other properties of movies
  Args: recentMovies - array of recently viewed movies,
        propertyName - name of the property to predict
  Output: array of the values with highest occurency rate for specified property*/
function predict(recentMovies: Array<Movie>, propertyName: string): Array<string> {
  // Forst check if provided property name is valid and recentMovies array is not empty
  if (recentMovies.length == 0 || recentMovies[0][propertyName] == undefined) {
    return;
  }

  let occurenciesList: object = {};

  interface predict {
    value: Array<string>,
    occurencies: number
  }
  let predict: predict = {
    value: null,
    occurencies: 0
  }

  // Fill the occurenciesList object with value - occurencies key - value pairs
  recentMovies.forEach(function(movie) {
    const values: Array<string> = movie[propertyName].split(', ');
    values.forEach(function(value) {
      if (value != 'N/A') {
        // If value already occured before, increment the value by 1
        if (occurenciesList[value]) {
          occurenciesList[value] += 1;
        } else {
          // Otherwise add new value and set it to 1
          occurenciesList[value] = 1;
        }
      }
    })
  })

  // Iterate through occurenciesList object and select value(-s) with highes occurency rate
  for (let value in occurenciesList) {
    if (occurenciesList[value] > predict.occurencies) {
      predict.value = [value];
      predict.occurencies = occurenciesList[value];
    } else if (occurenciesList[value] == predict.occurencies) {
      predict.value.push(value);
    }
  }

  return predict.value
}

// Class that is responsible for analysis of data from local storage and predicting the properties of movies
// that user might be interested in.
class BrainClass {
  /* Function to predict the genre of movies user is interested in
    Args: recentMovies - array of recently viewed movies
    Output: array of genre names */
  predictGenre(recentMovies: Array<Movie>): Array<string> {
    return predict(recentMovies, 'Genre');
  }
  /* Function to predict the production of movies user is interested in
    Args: recentMovies - array of recently viewed movies
    Output: array of production names */
  predictProduction(recentMovies: Array<Movie>): Array<string> {
    return predict(recentMovies, 'Production');
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
class CustomizationComponent {
  recentMovies: Array<Movie>;
  relevantMovies: Array<Movie>;

  constructor(private dataService: DataService) {
    const Brain = new BrainClass;

    /* If this is the first time user is using the app, define parameter in local storage to keep track of user's
    recently viewed movies */
    const recentMoviesNum: string = localStorage.getItem('recentMoviesNum');
    if (recentMoviesNum == undefined) {
      localStorage.setItem('recentMoviesNum', '0');
    }

    //Build an array of movies user might be interested in
    const recentMovies: Array<Movie> = dataService.getRecentMovies();
    const genre: Array<string> = Brain.predictGenre(recentMovies);
    const production: Array<string> = Brain.predictProduction(recentMovies);

    this.recentMovies = recentMovies;
  }

  /* Function to set current movie in data collector
    Args: movie - movie to set current */
  setCurrentMovie(movie: Movie): void {
    this.dataService.setCurrentMovie(movie);
  }

}

export { CustomizationComponent }
