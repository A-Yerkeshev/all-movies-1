import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PopularComponent } from './popular.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  { path: '', component: PopularComponent },
  { path: ':movie', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
