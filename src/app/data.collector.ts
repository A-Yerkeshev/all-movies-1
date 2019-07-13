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
  constructor(moviesArray) {
    this.movies = moviesArray;
    this.loaded = 0;
  }
  getMovieTitle(): string {
    let title = this.movies[this.loaded];
    this.loaded ++;
    return title;
  }
}
const defaultMoviesList = new MovieTitlesList(data.movies);

export class DataCollector {

}
