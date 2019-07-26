// Module is responsible for collecting the data from JSON files and the server
// responses through usage of API Communicator. Data then transmitted to Controller Component.

import { APICommunicator } from './api.communicator';
import data from "./movies.json"

const apiCommunicator = new APICommunicator;

// Class that stores titles of default movies and keeps track of what
//   movies are already loaded
class MovieTitlesList {
  movies: Array<string>;
  loaded: number;
  constructor(moviesArray: Array<string>) {
    this.movies = moviesArray;
    this.loaded = 0;
  }
  getMovieTitle(): string {
    let title = this.movies[this.loaded];
    this.loaded ++;
    return title;
  }
  getTotalNumber(): number {
    return this.movies.length;
  }
}
const defaultMoviesList = new MovieTitlesList(data.movies);

class DataCollector {
  constructor() {
  }
  totalDefaultMovies: number = defaultMoviesList.getTotalNumber();
  /* Function to load specified number of default movies
    Args: loadedList - list of movies that are already loaded and rendered on the template
          quantity - number of default movies to load
    Output: new list with both old and new default movies */
  loadDefaultMovies(loadedList: Array<object>, quantity: number): Array<object> {
    let newList = apiCommunicator.loadFromTitlesList(defaultMoviesList, quantity);
    return [...loadedList, ...newList];
  }
  /* Function that recieves searched movie title from Controller Component, makes corresponding
      AJAX request through API Communicator and returns movies found
    Args: title - title of the movie user searches for */
  searchMovie(title: string) {
    apiCommunicator.searchMovie(title);
  }
}

export { DataCollector }
