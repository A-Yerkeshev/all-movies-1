/* Component is responsible to organize the data recieved from Data Service according to user preferences. Component
keeps track of user's preferences through usage of local storage of the browser and cookies. */

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
class CustomizationComponent {

  constructor() {
    /* If this is the first time user is using the app, define parameter in local storage to keep track of user's
    recently viewed movies */
    const recentMoviesNum: string = localStorage.getItem('recentMoviesNum');
    if (recentMoviesNum == undefined) {
      localStorage.setItem('recentMoviesNum', '0');
    }
  }

}

export { CustomizationComponent }
