// Component is responsible for retrieving the data from Data Collector and
// inserting it into HTML templates

import { Component, OnInit } from '@angular/core';
import { DataCollector } from './data.collector';

const dataCollector = new DataCollector();

let defaultMovies: Array<object> = [];
defaultMovies = dataCollector.loadDefaultMovies(defaultMovies, 15);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
class ControllerComponent{
  page: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = dataCollector.totalDefaultMovies;
  movies = defaultMovies;
  // Function to load more default movies when user visits new page
  // arg: newPageIndex - new page index
  changePage(newPageIndex: number) {
    // Check first if new movies need to be loaded
    if (newPageIndex > this.movies.length/this.itemsPerPage) {
      this.movies = dataCollector.loadDefaultMovies(this.movies, this.itemsPerPage);
    }
    this.page = newPageIndex;
  }
}

export { ControllerComponent }
