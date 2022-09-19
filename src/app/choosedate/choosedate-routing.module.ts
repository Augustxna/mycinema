import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosedatePage } from './choosedate.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosedatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosedatePageRoutingModule {}
