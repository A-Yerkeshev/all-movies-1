/* Component is responsible to organize the data recieved from Data Service according to user preferences. Component
keeps track of user's preferences through usage of local storage of the browser. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';

/* Function that builds an object where keys are the values of local storage and values are numbers of their occurencies
    in local storage. Example: {movieTitle1: 1, movieTitle2: 4, movieTitle3: 2}
  Args: occurenciesList - object with local values as keys and their occurencies number as value
        localValues - array of string values from local storage to make count on */
function fillOccurenciesObject(occurenciesList: object, localValues: Array<string>): void {
  localValues.forEach(function(value) {
    if (value != 'N/A' && value != '') {
      // If value already occured before, increment the value by 1
      if (occurenciesList[value]) {
        occurenciesList[value] += 1;
      } else {
        // Otherwise add new value and set it to 1
        occurenciesList[value] = 1;
      }
    }
  })
}

// Interface to keep track of number of occuriencies of value in local storage
interface occurency {
  value: Array<string>,
  occurencies: number
}

/* Function to select most frequent value from occurencies object
  Args: occurenciesList - object with local values as keys and their occurencies number as value
  Output: array of most frequent keys */
function selectMostFrequent(occurenciesList: object): Array<string> {
  let occValue: occurency = {
    value: null,
    occurencies: 0
  }

  for (let value in occurenciesList) {
    if (occurenciesList[value] > occValue.occurencies) {
      occValue.value = [value];
      occValue.occurencies = occurenciesList[value];
    } else if (occurenciesList[value] == occValue.occurencies) {
      occValue.value.push(value);
    }
  }

  return occValue.value
}

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

  // Fill the occurenciesList object with value - occurencies key - value pairs
  recentMovies.forEach(function(movie) {
    const values: Array<string> = movie[propertyName].split(', ');

    fillOccurenciesObject(occurenciesList, values);
  })

  return selectMostFrequent(occurenciesList);
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
  /* Function to find most searched by user movie title
    Output: most popular title(-s) user searches for */
  getMostSearchedTitle(): Array<string> {
    if (localStorage.getItem('searches') == undefined) {
      return;
    }

    const searches: Array<string> = localStorage.getItem('searches').split(',');
    let titles: object = {};

    fillOccurenciesObject(titles, searches);

    return selectMostFrequent(titles);
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

    const recentMovies: Array<Movie> = dataService.getRecentMovies();
    const genre: Array<string> = Brain.predictGenre(recentMovies);
    const production: Array<string> = Brain.predictProduction(recentMovies);

    this.recentMovies = recentMovies;
    console.log('Most relevant genre - ', genre);
    console.log('Most relevant production - ', production);

    console.log(Brain.getMostSearchedTitle());
  }

  /* Function to set current movie in data collector
    Args: movie - movie to set current */
  setCurrentMovie(movie: Movie): void {
    this.dataService.setCurrentMovie(movie);
  }

}

export { CustomizationComponent }
