import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSummaryPage } from './book-summary.page';

const routes: Routes = [
  {
    path: '',
    component: BookSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSummaryPageRoutingModule {}
