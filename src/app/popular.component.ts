/* Component is responsible for retrieving most popular movies from OMDb server via Data Service
 and rendering them on the home page of the app with home.html template */

import { Component, OnInit } from '@angular/core';
import { DataService, Movie } from './data.service';
import { Router } from "@angular/router";
import $ from "jquery/dist/jquery.js";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.html'
})
class PopularComponent{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  lastPage: number;
  movies: Array<object>;
  displayedMovies: Array<object>;

  constructor(private dataService: DataService, private router: Router) {
    // Set properties according to data from session storage
    const currentPage: string = sessionStorage.getItem('currentPage');
    const itemsPerPage: string = sessionStorage.getItem('itemsPerPage');
    if (currentPage) {
      this.currentPage = parseInt(currentPage);
    } else {
      this.currentPage = 1;
    }
    if (itemsPerPage) {
      this.itemsPerPage = parseInt(itemsPerPage);
    } else {
      this.itemsPerPage = 15;
    }
    this.totalItems = dataService.totalDefaultMovies;
    this.lastPage = Math.ceil(this.totalItems/this.itemsPerPage);
    this.movies = dataService.movies;

    const lastIndex: number = this.currentPage * this.itemsPerPage;
    const firstIndex: number = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    this.setDisplayedMovies(firstIndex, lastIndex);
  }

  /* Function to create array of movies to display from list of loaded movies
    Args: firstIndex - index of first movie in movies array to be displayed
          lastIndex - index of last movie in movies array to be displayed*/
  setDisplayedMovies(firstIndex: number, lastIndex: number): void {
    const moviesSlice: Array<object> = this.movies.slice(firstIndex, lastIndex);
    // If all movies are loaded - just assign sliced array to displayed movies array
    if (moviesSlice.includes(null) == false) {
      this.displayedMovies = moviesSlice
    } else {
      // Otherwise exclude non-valid objects and assign
      let result: Array<object> = [];
      moviesSlice.forEach(function(movie: object) {
        if (movie) {
          result.push(movie);
        }
      })
      this.displayedMovies = result;
    }
  }

  /* Function to load more default movies when user visits new page
    Args: newPageIndex - new page index */
  changePage(newPageIndex: number): void {
    // Check if new page index is valid
    if (newPageIndex > 0 && newPageIndex <= this.lastPage) {
      this.displayedMovies = [];
      // Display loading spinner while new movies are loading
      const spinner: string = `<div class="position-absolute w-100 bg-white text-center spinner-sheet">
        <div class="spinner-border text-secondary mt-5" role="status"><span class="sr-only">Loading...</span></div>
        </div>`;
      $('.top-movies').append(spinner);

      // To load movies asynchronously, wrap it into setTimeout function
      setTimeout(function(component: PopularComponent) {
        const firstIndex: number = (newPageIndex - 1) * component.itemsPerPage + 1;
        const lastIndex: number = (newPageIndex - 1) * component.itemsPerPage + component.itemsPerPage;
        component.dataService.loadDefaultMovies(firstIndex, lastIndex);
        // Display movies on page
        component.setDisplayedMovies(firstIndex, lastIndex + 1);

        // Remove loading spinner
        $('.spinner-sheet').remove();
      }, 10, this);
      this.currentPage = newPageIndex;
      // Remember what last page was open
      sessionStorage.setItem('currentPage', newPageIndex.toString());
    }
  }

  /* Function to pass searched title of the movie as parameter of query string and redirect to search page
    Args: title - title of the movie user searches for */
  search(title: string): void {
    this.router.navigate(['/search'], {queryParams: {title}});
  }

  /* Function that sets movie items to display on single page
    Args: itemsPerPageNewString - string value of number of movie items to set */
  setItemsPerPage(itemsPerPageNewString: string): void {
    const itemsPerPageNew: number = parseInt(itemsPerPageNewString);
    this.itemsPerPage = itemsPerPageNew;
    this.lastPage = Math.ceil(this.totalItems/itemsPerPageNew);

    // If with new itemsPerPage parameter current page would not exist - set current page to last existing
    if (this.currentPage > this.lastPage) {
      this.changePage(this.lastPage);
    } else {
      // Otherwise re-render the current page with new items per page
      this.changePage(this.currentPage);
    }

    // Remember itemsPerPage parameter
    sessionStorage.setItem('itemsPerPage', itemsPerPageNew.toString());
  }

  /* Function to set current movie in data collector
    Args: movie - movie to set current */
  setCurrentMovie(movie: Movie): void {
    this.dataService.setCurrentMovie(movie);
    // Store viewed movie title in local storage
    const recentMoviesNum: number = parseInt(localStorage.getItem('recentMoviesNum'));
    localStorage.setItem((Date.now()).toString(), movie.Title);
    // If number of movies stored in local storage is 15 - remove oldest movie - otherwise increment
    // recentMoviesNum by one.
    if (recentMoviesNum == 15) {
      let oldest: number = 0;
      for (let i=0; i<localStorage.length; i++) {
        const utcDate: number = parseInt(localStorage.key(i));
        if (utcDate && utcDate > oldest) {
          oldest = utcDate;
        }
      }
      localStorage.removeItem(oldest.toString());
    } else {
      localStorage.setItem('recentMoviesNum', (recentMoviesNum + 1).toString());
    }
  }
}

export { PopularComponent }
