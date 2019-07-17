// Component is responsible for retrieving the data from Data Collector and
// inserting it into HTML templates

import { Component, OnInit } from '@angular/core';
import { DataCollector } from './data.collector';

const dataCollector = new DataCollector();

let defaultMovies: Array<object> = [];
defaultMovies = dataCollector.loadDefaultMovies(defaultMovies, 30);
console.log(defaultMovies);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
class ControllerComponent implements OnInit {
  p: number = 1;
  movies = defaultMovies;
  ngOnInit() {
  }
}

export { ControllerComponent }
