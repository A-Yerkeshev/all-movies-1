import $ from "jquery/dist/jquery.js";

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
  // args: defaultsMovies - instance of DefaultMovies class initialized in data.component.ts
  //      quantity - number of default movies to load
  // output: array of default movie objects
  loadFromDefaultsList(defaultsMovies, quantity: number): Array<object> {
    let result: Array<object> = [];

    for (let i=0; i<quantity; i++) {
      let title: string = defaultsMovies.getMovieTitle();
      let movie: object = loadMovie(title);
      result.push(movie);
    }

    return result;
  }
}

export { APICommunicator };
