import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ControllerComponent } from './controller.component';

@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ControllerComponent]
})
export class AppModule { }
