import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectseatPageRoutingModule } from './selectseat-routing.module';

import { SelectseatPage } from './selectseat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectseatPageRoutingModule
  ],
  declarations: [SelectseatPage]
})
export class SelectseatPageModule {}
