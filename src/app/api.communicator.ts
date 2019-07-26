// Module is responside for communication with the server, sending AJAX requests to it
// and retreive the responce in TypeScript operatable format. API Communicator is used
// by Data Collector.

import $ from "jquery/dist/jquery.js";

/* Function to send AJAX request to OMDb API
  Args: title - title of the movie
        search - boolean that indicates whether a response shall be a movie object or
          a search object. Default is false.
  Output: matched movie object or a search object
  Notes: if function is used to retrieve single movie object it should be used
    with following syntax: loadMovie(title). If function is used to retrieve an
    array of matched movies the syntax is: loadMovie(title, true).Search */
const loadMovie: (arg1: string, arg2?: boolean)=> Response =
  function(title: string, search: boolean = false): Response {
    let url: string = 'http://www.omdbapi.com/?apikey=f17da8f8&';
    let result: Response;

    if (search === true) {
      url += 's=' + title;
    } else {
      url += 't=' + title;
    }

    // Make an AJAX call and assign result
    $.ajax({
      url: url,
      async: false,
      success: function(response: Response) {
        result = response;
      }
    })
    return result;
  }

// If server response contains multiple movie objects, the array shall be accessed through
// .Search property
interface Response {
  Search?: Array<object>
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
      let movie: object = loadMovie(title);
      result.push(movie);
    }

    return result;
  }
  /* Function to load the movie by user search
    Args: title - title of the movie user searches for
    Output: array of matched movies */
  searchMovie(title: string): Array<object> {
    let result: Array<object>;
    result = loadMovie(title, true).Search;
    return result;
  }
}

export { APICommunicator };
