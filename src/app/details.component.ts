/* Component is responsible for showing more detailed information about the movie that user selected. It gets
  the data from Data Service and interacts with user through movie.html template */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './details.html'
})
class DetailsComponent{
  movie: Movie;
  data: Array<Array<any>>;
  constructor(dataService: DataService) {
    this.data = [];
    this.movie = dataService.currentMovie;

    for (let property in this.movie) {
      this.data.push([property, this.movie[property]]);
    }
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

export { DetailsComponent }
