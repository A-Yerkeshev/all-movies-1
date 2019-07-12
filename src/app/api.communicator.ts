import $ from "jquery/dist/jquery.js";

// Function to send AJAX request to OMDb API
const makeAjaxCall: (arg: number | string) => object =
  function(param: number | string): object {
    let url: string = 'http://www.omdbapi.com/?apikey=f17da8f8&';
    let response: object;

    // Check if parameter passed to function is id or title of the movie
    if ($.type(param) === 'number') {
      url += 'i='
    } else if ($.type(param) === 'string') {
      url += 't='
    }
    url += param;

    // Make an AJAX call and return result
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
  call(param) {
    console.log(makeAjaxCall(param));
  }
}

export { APICommunicator };
