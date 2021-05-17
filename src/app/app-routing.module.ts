import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchImagesComponent} from './search-images/search-images.component';
import {SelectedComponent} from './selected/selected.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: SearchImagesComponent},
  {path: 'selected', component: SelectedComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
