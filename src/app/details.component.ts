/* Component is responsible for showing more detailed information about the movie that user selected. It gets
  the data from Data Service and interacts with user through movie.html template */

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './details.html'
})
class DetailsComponent{
  movie: object;
  constructor(dataService: DataService) {
    this.movie = dataService.currentMovie;
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
