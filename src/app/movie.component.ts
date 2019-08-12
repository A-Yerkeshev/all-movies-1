/* Movie component is responsible for showing more detailed information about the movie that user selected. It gets
  the data from Data Service and interacts with user through movie.html template */

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html'
})
class MovieComponent{
  movie: object;
  constructor(dataService: DataService) {
    const taxiMovie = {
      Title:"Taxi",
      Year: 1998,
      Rated:"Not Rated",
      Released:"20 Nov 1998",
      Runtime:"86 min",
      Genre:"Action, Comedy, Crime",
      Director:"Gérard Pirès",
      Writer:"Luc Besson (scenario)",
      Actors:"Samy Naceri, Frédéric Diefenthal, Marion Cotillard, Manuela Gourary",
      Plot:"To work off his tarnished driving record, a hip taxi driver must chauffeur a loser police inspector on the trail of German bank robbers.",
      Language:"French, German, Korean, Portuguese",
      Country:"France","Awards":"3 wins & 5 nominations.",
      Poster:"https://m.media-amazon.com/images/M/MV5BMmViOGVjZWQtZmNmNS00MWU3LWFjNGEtMDc1MjNlY2ZlNjdiXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
      Ratings:[{
        Source:"Internet Movie Database",
        Value:"7.0/10"
      }],
      Metascore:"N/A",
      imdbRating: 7.0,
      imdbVotes:"71,960",
      imdbID:"tt0152930",
      Type:"movie",
      DVD:"N/A",
      BoxOffice:"N/A",
      Production:"N/A",
      Website:"N/A",
      Response:"True"
    }
    this.movie = taxiMovie;

  }

  /* Function that tells whether key-value pair of a movie object is valid to display it on the page
    Args: value - the value to be checked
    Output: boolean */
  isValidForDisplay(value: any): boolean {
    if (typeof value === 'string' || typeof value == 'number') {
      return true
    } else {
      return false
    }
  }
}

export { MovieComponent }
