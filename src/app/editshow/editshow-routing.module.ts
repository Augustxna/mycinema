import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditshowPage } from './editshow.page';

const routes: Routes = [
  {
    path: '',
    component: EditshowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditshowPageRoutingModule {}
