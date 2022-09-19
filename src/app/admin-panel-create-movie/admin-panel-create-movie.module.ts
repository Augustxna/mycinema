import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPanelCreateMoviePageRoutingModule } from './admin-panel-create-movie-routing.module';

import { AdminPanelCreateMoviePage } from './admin-panel-create-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPanelCreateMoviePageRoutingModule
  ],
  declarations: [AdminPanelCreateMoviePage]
})
export class AdminPanelCreateMoviePageModule {}
