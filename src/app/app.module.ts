import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { ControllerComponent } from './controller.component';

@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [ControllerComponent]
})
class AppModule { }

export { AppModule }
