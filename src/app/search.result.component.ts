/* Component is responsible for handling search queries made by user and rendering the results with search.result.html
template. */

import { Component } from '@angular/core';
import { DataService, Movie } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search.result.html'
})
export class SearchResultComponent{
  searchTitle: string;
  searchResult: Array<Movie>;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    const title = this.route.snapshot.queryParamMap.get('title');
    this.searchTitle = title;
    this.searchResult = dataService.searchMovie(title);
    console.log(this.searchResult)
  }

}
