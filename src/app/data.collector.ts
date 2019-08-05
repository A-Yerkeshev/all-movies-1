// Module is responsible for collecting the data from JSON files and the server
// responses through usage of API Communicator. Data then transmitted to Controller Component.

import { APICommunicator } from './api.communicator';
import data from "./movies.json"

const apiCommunicator = new APICommunicator;

// Class that stores titles of default movies and keeps track of what
// movies are already loaded
class MovieTitlesList {
  movies: Array<string>;
  loaded: Array<number>;
  constructor(moviesArray: Array<string>) {
    this.movies = moviesArray;
    this.loaded = [];
  }
  /* Function to get movie title
    Args: index - index of movie title in the list
    Output: movie title string */
  getMovieTitle(index: number): string {
    return this.movies[index];
  }
  // Function to get total lenght of movies array
  getTotalNumber(): number {
    return this.movies.length;
  }
  // Function to mark certain movie loaded
  markLoaded(index: number): void {
    if (this.loaded.includes(index) == false) {
      this.loaded.push(index);
      this.loaded.sort((num1: number, num2: number): number => num1 - num2);
    }
  }
  /* Function that checks if movie already been loaded
    Args: index - index of movie title in array
    Output: boolean */
  isLoaded(index: number): boolean {
    return this.loaded.includes(index)
  }
}
const defaultMoviesList = new MovieTitlesList(data.movies);

class DataCollector {
  totalDefaultMovies: number
  constructor() {
    this.totalDefaultMovies = defaultMoviesList.getTotalNumber();
  }
  /* Function to load specified number of default movies
    Args: moviesList - array with spaces allocated for movie objects. Example:
            [null, movieObject, movieObject, ... null]
          firstIndex - index of movie to start loading from
          lastIndex - last index of movie to be loaded */
  loadDefaultMovies(moviesList: Array<object>, firstIndex: number, lastIndex: number): void {
    // First check if required movies are already loaded
    const from: number = defaultMoviesList.loaded.indexOf(firstIndex);
    const to: number = defaultMoviesList.loaded.indexOf(lastIndex + 1);
    const checkArray: Array<number> = defaultMoviesList.loaded.slice(from, to);

    if (checkArray.length == lastIndex - firstIndex + 1) {
      return
    } else {
      // Otherwise fill empty spaces in moviesList by movie objects
      let currentIndex: number = firstIndex;
      while (currentIndex <= lastIndex) {
        if (moviesList[currentIndex] == null) {
          const movie = apiCommunicator.loadDefaultMovie(defaultMoviesList, currentIndex);
          moviesList[currentIndex] = movie;
        }
        currentIndex++;
      }
    }
  }
  /* Function that recieves searched movie title from Controller Component, makes corresponding
      AJAX request through API Communicator and returns movies found
    Args: title - title of the movie user searches for */
  searchMovie(title: string): Array<object> {
    return apiCommunicator.searchMovie(title);
  }
  /* Function to return total number of default movies
    Output: number of movies */
  totalMovies(): number {
    return defaultMoviesList.getTotalNumber();
  }
}

export { DataCollector, MovieTitlesList }
