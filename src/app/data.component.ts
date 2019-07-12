import { Component } from '@angular/core';
import { APICommunicator } from './api.communicator';

const Communicator = new APICommunicator;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DataComponent {
  call(param) {
    Communicator.call(param);
  }
}
