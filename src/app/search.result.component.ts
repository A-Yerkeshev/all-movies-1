/* Component is responsible for handling search queries made by user and rendering the results with search.result.html
template. */

import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search.result.html'
})
export class SearchResultComponent{
  searchTitle: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.searchTitle = this.route.snapshot.queryParamMap.get('title');
  }

}
