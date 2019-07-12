import $ from "jquery/dist/jquery.js";
import data from "./movies.json"

// Class that stores titles of default movies and keeps track of
// what movies are already loaded
class DefaultMovies {
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
const defaultMovies = new DefaultMovies(data.movies);

// Function to send AJAX request to OMDb API
// arg: title - title of the movie
// output: movie object
const loadMovie: (arg: string) => object =
  function(title: string): object {
    let url: string = 'http://www.omdbapi.com/?apikey=f17da8f8&';
    let response: object;

    url += 't=' + title;

    // Make an AJAX call and assign result
    $.ajax({
      url: url,
      async: false,
      success: function(result) {
        response = result;
      }
    })

    return response;
  }


class APICommunicator {
  constructor() {
  }
  // Function to load movies by default
  // arg: quantity - number of default movies to load
  // output: array of default movie objects
  loadFromDefaultsList(quantity: number): Array<object> {
    let result: Array<object> = [];

    for (let i=0; i<quantity; i++) {
      let title: string = defaultMovies.getMovieTitle();
      let movie: object = loadMovie(title);
      result.push(movie);
    }

    return result;
  }
}

export { APICommunicator };
