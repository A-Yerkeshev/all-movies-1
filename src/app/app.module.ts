import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataComponent } from './data.component';

@NgModule({
  declarations: [
    DataComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [DataComponent]
})
export class AppModule { }
