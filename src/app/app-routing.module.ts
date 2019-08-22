import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomizationComponent } from './customization.component'
import { PopularComponent } from './popular.component';
import { SearchResultComponent } from './search.result.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  { path: '', component: CustomizationComponent },
  { path: 'popular', component: PopularComponent },
  { path: 'search', component: SearchResultComponent},
  { path: ':movie', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
