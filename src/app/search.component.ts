/* Component is responsible for handling search queries made by user and rendering the results with search.html
template. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';
import { Router, ActivatedRoute } from '@angular/router';
import $ from "jquery/dist/jquery.js";

/* Function to add searched title to local storage
  Args: title - title of the movie user searched for */
function addToLocalStorage(title: string): void {
  title = title.toLowerCase();
  const recentSearches: Array<string> = localStorage.getItem('searches').split(',');
  // If number of recent searches exceeds 50 - remove the oldest one
  if (recentSearches.length > 50) {
    recentSearches.shift();
  }
  localStorage.setItem('searches', recentSearches.join() + ',' + title);
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search.html'
})
export class SearchComponent{
  searchTitle: string;
  searchResult: Array<Movie>;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    const title: string = this.route.snapshot.queryParamMap.get('title');
    // If it is the first time user uses search - initialize searches parameter in local storage
    if (localStorage.getItem('searches') == undefined) {
      localStorage.setItem('searches', '');
    }
    addToLocalStorage(title);

    this.searchTitle = title;
    this.searchResult = dataService.searchMovie(title);

  }

  /* Function to make new seacrh by another title
    Args: title - title of movie to search for */
  search(title: string): void {
    this.router.navigate(['/search'], {queryParams: {title}});
    this.searchTitle = title;
    this.searchResult = this.dataService.searchMovie(title);
    addToLocalStorage(title);
  }

  /* Function to set current movie in data collector
    Args: title - title of the movie to set current */
  setCurrentMovie(title: string): void {
    // First get more detailed info about selected movie
    const movie: Movie = this.dataService.getMovie(title);
    // Then set it as current
    this.dataService.setCurrentMovie(movie);
  }

}
