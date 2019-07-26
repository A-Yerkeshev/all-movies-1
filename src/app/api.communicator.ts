// Module is responside for communication with the server, sending AJAX requests to it
// and retreive the responce in TypeScript operatable format. API Communicator is used
// by Data Collector.

import $ from "jquery/dist/jquery.js";

/* Function to send AJAX request to OMDb API
  Args: title - title of the movie
        single - boolean that indicates whether to request a single movie that matches
          the title or the set of all movies that match the title. Default is true
  Output: array of matched movie objects
  Notes: if function is used to retrieve single movie object it should be used
    with following syntax: loadMovie(title)[0]. If function is used to retrieve an
    array of matched movies the syntax is: loadMovie(title, false) */
const loadMovie: (arg1: string, arg2?: boolean) => Array<object> =
  function(title: string, single: boolean = true): Array<object> {
    let url: string = 'http://www.omdbapi.com/?apikey=f17da8f8&';
    let result: Array<object> = [];

    if (single === false) {
      url += 's=' + title;
    } else {
      url += 't=' + title;
    }

    // Make an AJAX call and assign result
    $.ajax({
      url: url,
      async: false,
      success: function(response: object | Array<object>) {
        // If single movie was returned - push it to result array, otherwise -
        // assign returned array to result variable
        if (typeof(response) == 'object') {
          result.push(response);
        } else {
          result = response;
        }
      }
    })

    return result;
  }


class APICommunicator {
  constructor() {
  }
  /* Function to load movies by default
    Args: titlesList - instance of MovieTitlesList class initialized in data.component.ts
        quantity - number of default movies to load
    Output: array of default movie objects */
  loadFromTitlesList(titlesList, quantity: number): Array<object> {
    let result: Array<object> = [];

    for (let i=0; i<quantity; i++) {
      let title: string = titlesList.getMovieTitle();
      let movie: object = loadMovie(title)[0];
      result.push(movie);
    }

    return result;
  }
  /* Function to load the movie by user search
    Args: title - title of the movie user searches for
    Output: array of matched movies */
  searchMovie(title: string): Array<object> {
    let result: Array<object> = [];
    result = loadMovie(title, false);
    return result;
  }
}

export { APICommunicator };
