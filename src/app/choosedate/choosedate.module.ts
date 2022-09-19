import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosedatePageRoutingModule } from './choosedate-routing.module';

import { ChoosedatePage } from './choosedate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosedatePageRoutingModule
  ],
  declarations: [ChoosedatePage]
})
export class ChoosedatePageModule {}
