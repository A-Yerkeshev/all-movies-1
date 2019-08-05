// Component is responsible for retrieving most popular movies from OMDb server via Data Collector
// and rendering them on the home page of the app

import { Component, OnInit } from '@angular/core';
import { DataCollector } from './data.collector';
import $ from "jquery/dist/jquery.js";

const dataCollector = new DataCollector();

let movies: Array<object> = [];
// Allocate space in movies array. As new movies will be loaded they will be placed
// in array according to their index in movies.json
for (let i=0; i<=dataCollector.totalMovies(); i++) {
  movies.push(null)
}

// Load first 15 movies
dataCollector.loadDefaultMovies(movies, 0, 15);

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
class HomePageComponent{
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = dataCollector.totalDefaultMovies;
  lastPage: number = Math.ceil(this.totalItems/this.itemsPerPage);
  movies: Array<object> = movies;
  displayedMovies: Array<object> = this.movies.slice(0, 15);
  /* Function to load more default movies when user visits new page
    Args: newPageIndex - new page index */
  changePage(newPageIndex: number) {
    // Check if new page index is valid
    if (newPageIndex > 0 && newPageIndex <= this.lastPage) {
      // Display loading spinner while new movies are loading
      const spinner: string = `<div class="position-absolute w-100 bg-white text-center spinner-sheet">
        <div class="spinner-border text-secondary mt-5" role="status"><span class="sr-only">Loading...</span></div>
        </div>`;
      $('.top-movies').append(spinner);

      // To load movies asynchronously, wrap it into setTimeout function
      setTimeout(function(component: HomePageComponent) {
        const firstIndex = (newPageIndex - 1) * component.itemsPerPage + 1;
        const lastIndex = (newPageIndex - 1) * component.itemsPerPage + component.itemsPerPage;
        dataCollector.loadDefaultMovies(component.movies, firstIndex, lastIndex);
        // Display movies on page
        component.displayedMovies = component.movies.slice(firstIndex, lastIndex);

        // Remove loading spinner
        $('.spinner-sheet').remove();
      }, 10, this);
      this.currentPage = newPageIndex;
    }
  }
  /* Function to pass searched title of the movie to Data Collector and render recieved movies on page
    Args: title - title of the movie user searches for */
  search(title: string) {
    dataCollector.searchMovie(title);
  }
  /* Function that sets movie items to display on single page
    Args: num - number of movie items to set */
  setItemsPerPage(num: number) {
    this.itemsPerPage = num;
    this.changePage(this.currentPage);
    this.lastPage = Math.ceil(this.totalItems/this.itemsPerPage);
  }
}

export { HomePageComponent }
