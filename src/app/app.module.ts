import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PopularComponent } from './popular.component';
import { DetailsComponent } from './details.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomizationComponent } from './customization.component';
import { SearchResultComponent } from './search.result.component';

@NgModule({
  declarations: [
    PopularComponent,
    DetailsComponent,
    AppComponent,
    CustomizationComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
class AppModule { }

export { AppModule }
