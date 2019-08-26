/* Component is responsible for handling search queries made by user and rendering the results with search.html
template. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';
import { ActivatedRoute } from '@angular/router';
import $ from "jquery/dist/jquery.js";

@Component({
  selector: 'app-search-result',
  templateUrl: './search.html'
})
export class SearchComponent{
  searchTitle: string;
  searchResult: Array<Movie>;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    const title: string = this.route.snapshot.queryParamMap.get('title');

    this.searchTitle = title;
    this.searchResult = dataService.searchMovie(title);

  }

}
