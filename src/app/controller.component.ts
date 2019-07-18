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
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = dataCollector.totalDefaultMovies;
  lastPage: number = this.totalItems/this.itemsPerPage;
  loadedMovies: Array<object> = defaultMovies;
  displayedMovies: Array<object> = defaultMovies;
  // Function to load more default movies when user visits new page
  // arg: newPageIndex - new page index
  changePage(newPageIndex: number) {
    // Check if new page index is valid
    if (newPageIndex > 0 && newPageIndex <= this.lastPage) {
      // Check if new movies need to be loaded
      if (newPageIndex > this.loadedMovies.length/this.itemsPerPage) {
        this.loadedMovies = dataCollector.loadDefaultMovies(this.loadedMovies, this.itemsPerPage);
      }
      // Display movies on page
      let firstMovieIndex: number = this.itemsPerPage*(newPageIndex-1);
      this.displayedMovies = this.loadedMovies.slice(firstMovieIndex, firstMovieIndex+this.itemsPerPage);
      this.currentPage = newPageIndex;
    }
  }
}

export { ControllerComponent }
