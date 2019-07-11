import $ from "jquery/dist/jquery.js";
import { Component } from '@angular/core';

const omdbUrl: string = 'http://www.omdbapi.com/?apikey=f17da8f8&';
let omdbResponse: object;

$.ajax({
  url: omdbUrl + 't=Taxi',
  success: function(result) {
    omdbResponse = result;
    console.log(omdbResponse);
  }
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DataComponent {

}
