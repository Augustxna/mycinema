import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSummaryPageRoutingModule } from './book-summary-routing.module';

import { BookSummaryPage } from './book-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookSummaryPageRoutingModule
  ],
  declarations: [BookSummaryPage]
})
export class BookSummaryPageModule {}
