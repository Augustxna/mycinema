import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelCreateMoviePage } from './admin-panel-create-movie.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelCreateMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelCreateMoviePageRoutingModule {}
