import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home.page.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: ':movie', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
