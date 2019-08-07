import { Component } from '@angular/core';
import { DataCollector } from './data.collector';

const dataCollector = new DataCollector();

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html'
})
class MovieComponent{
  currentMovie: object;
  constructor() {
    this.currentMovie = dataCollector.currentMovie
  }
}

export { MovieComponent }
