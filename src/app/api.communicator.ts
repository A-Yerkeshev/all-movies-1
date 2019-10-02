// Module is responside for communication with the server, sending AJAX requests to it
// and retreive the responce in TypeScript operatable format. API Communicator is used
// by Data Service.

import { MovieTitlesList, Movie, MovieSearch, movieGuard, movieSearchGuard } from "./data.service"
import $ from "jquery/dist/jquery.js";

/* Function to send AJAX request to OMDb API
  Args: title - title of the movie
        search - boolean that indicates whether a response shall be a movie object or
          a search object. Default is false.
  Output: matched movie object or a search object
  Notes: if function is used to retrieve single movie object it should be used
    with following syntax: loadMovie(title). If function is used to retrieve an
    array of matched movies the syntax is: loadMovie(title, true).Search */
const loadMovie: (arg1: string, arg2?: boolean)=> Movie|MovieSearch =
  function(title: string, search: boolean = false): Movie|MovieSearch {
    let url: string = 'https://www.omdbapi.com/?apikey=f17da8f8&';
    let result: Movie|MovieSearch;

    if (search === true) {
      url += 's=' + title;
    } else {
      url += 't=' + title;
    }

    // Make an AJAX call and assign result
    $.ajax({
      url: url,
      async: false,
      success: function(response: Movie|MovieSearch) {
        result = response;
      },
      error: function(error: object) {
        result = null;
      },
      timeout: 3000
    })
    return result;
  }

class APICommunicator {
  constructor() {
  }
  /* Function to load default movies
    Args: titlesList - instance of MovieTitlesList class initialized in data.component.ts
        index - index of default movie title
    Output: movie object */
  loadDefaultMovie(titlesList: MovieTitlesList, index: number): Movie {
    const title: string = titlesList.getMovieTitle(index);
    const response: Movie|MovieSearch = loadMovie(title);
    let result: Movie = null;

    if (title) {
      if (response && movieGuard(response)) {
        result = response;
        titlesList.markLoaded(index);
      }
    }

    return result
  }
  /* Function to load the movie by user search
    Args: title - title of the movie user searches for
    Output: array of matched movies */
  searchMovie(title: string): Array<Movie> {
    const response: Movie|MovieSearch = loadMovie(title, true);
    let result: Array<Movie> = null;

    if (response && movieSearchGuard(response)) {
      result = response.Search;
    }
    return result;
  }

  /* Function to load single movie by title
    Args: title - title of the movie to load
    Output: movie object */
  loadMovie(title: string): Movie {
    const response: Movie|MovieSearch = loadMovie(title);
    let result: Movie = null

    if (response && movieGuard(response)) {
      result = response;
    }

    return result;
  }
}

export { APICommunicator };
