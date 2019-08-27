/* Component is responsible for handling search queries made by user and rendering the results with search.html
template. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';
import { Router, ActivatedRoute } from '@angular/router';
import $ from "jquery/dist/jquery.js";

@Component({
  selector: 'app-search-result',
  templateUrl: './search.html'
})
export class SearchComponent{
  searchTitle: string;
  searchResult: Array<Movie>;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    const title: string = this.route.snapshot.queryParamMap.get('title');

    this.searchTitle = title;
    this.searchResult = dataService.searchMovie(title);

  }

  /* Function to make new seacrh by another title
    Args: title - title of movie to search for */
  search(title: string): void {
    this.router.navigate(['/search'], {queryParams: {title}});
    this.searchTitle = title;
    this.searchResult = this.dataService.searchMovie(title);
  }

  /* Function to set current movie in data collector
    Args: title - title of the movie to set current */
  setCurrentMovie(title: string): void {
    // First get more detailed info about selected movie
    const movie: Movie = this.dataService.getMovie(title);
    // Then set it as current
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
