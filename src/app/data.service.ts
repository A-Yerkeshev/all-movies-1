/* Service is responsible for collecting the data from JSON files, the server
  responses through usage of API Communicator and from user inputs through components. Data then transmitted
  to components. */

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

// Interface of movie object
interface Movie{
  Title: string
  Year: string
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Awards?: string
  Poster: string
  Ratings?:Array<object>
  Metascore?: string
  imdbRating?: string
  imdbVotes?: string
  imdbID: string
  Type: string
  DVD?: string
  BoxOffice?: string
  Production?: string
  Website?: string
  Response?: string
}

// If server response contains multiple movie objects, the array shall be accessed through
// .Search property
interface MovieSearch {
  Search: Array<Movie>
}

// Define type guards for Movie and MovieSearch interfaces
/* Args: response - response retrieved from the server. Might be a movie object, a movie search object
    Output: response of server interpreted by TypeScript as movie or as movie search object*/
function movieGuard(response: Movie | MovieSearch): response is Movie {
  return response as Movie !== undefined;
}

function movieSearchGuard(response: Movie | MovieSearch): response is MovieSearch {
  return response as MovieSearch !== undefined;
}

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

    // Load movies for the first page
    const currentPageString: string = sessionStorage.getItem('currentPage');
    const itemsPerPageString: string = sessionStorage.getItem('itemsPerPage');
    let currentPage: number;
    let itemsPerPage: number;
    if (currentPageString) {
      currentPage = parseInt(currentPageString);
    } else {
      currentPage = 1;
    }
    if (itemsPerPageString) {
      itemsPerPage = parseInt(itemsPerPageString);
    } else {
      itemsPerPage = 15;
    }

    const lastIndex: number = currentPage * itemsPerPage;
    const firstIndex: number = currentPage * itemsPerPage - itemsPerPage;
    this.loadDefaultMovies(firstIndex, lastIndex);
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
  searchMovie(title: string): Array<Movie> {
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
  /* Function to load single movie by title
    Args: title - title of the movie to load
    Output: movie object */
  getMovie(title: string): Movie {
    return apiCommunicator.loadMovie(title);
  }
  /* Function to build an array of recently viewed movies by data from the local storage
    Output: array of movie objects */
  getRecentMovies(): Array<Movie> {
    let result: Array<Movie> = [];

    for (let i=0; i<localStorage.length; i++) {
      const key: string = localStorage.key(i);
      if ( key !== 'recentMoviesNum') {
        const title: string = localStorage.getItem(key);
        const movie: Movie = apiCommunicator.loadMovie(title);
        if (movie) {
          result.push(movie);
        }
      }
    }
    return result;
  }
}

export { DataService, MovieTitlesList, Movie, MovieSearch, movieGuard, movieSearchGuard }
