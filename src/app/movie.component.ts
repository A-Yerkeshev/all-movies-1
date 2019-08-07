/* Movie component is responsible for showing more detailed information about the movie that user selected. It gets
  the data from Data Service and interacts with user through movie.html template */

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html'
})
class MovieComponent{
  currentMovie: object;
  constructor(dataService: DataService) {
    this.currentMovie = dataService.currentMovie;
  }
}

export { MovieComponent }
