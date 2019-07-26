import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home.page.component';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HomePageComponent]
})
class AppModule { }

export { AppModule }
