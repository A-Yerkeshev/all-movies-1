import { Component } from '@angular/core';
import { APICommunicator } from './api.communicator';
import data from "./movies.json"

const apiCommunicator = new APICommunicator;

// Class that stores titles of default movies and keeps track of what
//   movies are already loaded
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DataComponent {
  click() {
    console.log(apiCommunicator.loadFromDefaultsList(defaultMovies, 2));
  }
}
