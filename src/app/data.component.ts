import { Component } from '@angular/core';
import { APICommunicator } from './api.communicator';

const apiCommunicator = new APICommunicator;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DataComponent {
  click() {
    console.log(apiCommunicator.loadFromDefaultsList(5))
  }
}
