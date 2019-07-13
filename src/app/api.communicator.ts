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
  // args: titlesList - instance of MovieTitlesList class initialized in data.component.ts
  //      quantity - number of default movies to load
  // output: array of default movie objects
  loadFromTitlesList(titlesList, quantity: number): Array<object> {
    let result: Array<object> = [];

    for (let i=0; i<quantity; i++) {
      let title: string = titlesList.getMovieTitle();
      let movie: object = loadMovie(title);
      result.push(movie);
    }

    return result;
  }
}

export { APICommunicator };