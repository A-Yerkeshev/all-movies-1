import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home.page.component';
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [
    HomePageComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HomePageComponent]
})
class AppModule { }

export { AppModule }
