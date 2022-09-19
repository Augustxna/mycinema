import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelEditMoviePage } from './admin-panel-edit-movie.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelEditMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelEditMoviePageRoutingModule {}
