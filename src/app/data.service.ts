/* Service is responsible for collecting the data from JSON files, the server
  responses through usage of API Communicator and from user inputs through components. Data then transmitted
  to Popular Component and Details Component. */

import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
class DataService {
  totalDefaultMovies: number;
  currentMovie: object;
  movies: Array<object>;
  constructor() {
    let movies: Array<object> = [];
    // Allocate space in movies array. As new movies will be loaded they will be placed
    // in array according to their index in movies.json
    for (let i=0; i<=this.totalMovies(); i++) {
      movies.push(null)
    }

    this.totalDefaultMovies = defaultMoviesList.getTotalNumber();
    this.currentMovie = null;
    this.movies = movies;

    // Load first 15 movies
    this.loadDefaultMovies(0, 15);
  }
  /* Function to load specified number of default movies to DataService.movies parameter
    Args: firstIndex - index of movie to start loading from
          lastIndex - last index of movie to be loaded */
  loadDefaultMovies(firstIndex: number, lastIndex: number): void {
    // First check if required movies are already loaded
    const from: number = defaultMoviesList.loaded.indexOf(firstIndex);
    const to: number = defaultMoviesList.loaded.indexOf(lastIndex + 1);
    const checkArray: Array<number> = defaultMoviesList.loaded.slice(from, to);

    if (checkArray.length == lastIndex - firstIndex + 1) {
      return
    } else {
      // Otherwise fill empty spaces in movies list by movie objects
      let currentIndex: number = firstIndex;
      while (currentIndex <= lastIndex) {
        if (this.movies[currentIndex] == null) {
          const movie = apiCommunicator.loadDefaultMovie(defaultMoviesList, currentIndex);
          this.movies[currentIndex] = movie;
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
  /* Function to set current movie
    Args: movie - movie to set current */
  setCurrentMovie(movie: object): void {
    this.currentMovie = movie;
  }
}

export { DataService, MovieTitlesList }
