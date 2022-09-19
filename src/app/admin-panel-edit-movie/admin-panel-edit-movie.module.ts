import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPanelEditMoviePageRoutingModule } from './admin-panel-edit-movie-routing.module';

import { AdminPanelEditMoviePage } from './admin-panel-edit-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPanelEditMoviePageRoutingModule
  ],
  declarations: [AdminPanelEditMoviePage]
})
export class AdminPanelEditMoviePageModule {}
