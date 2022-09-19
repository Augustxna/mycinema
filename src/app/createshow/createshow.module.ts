import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateshowPageRoutingModule } from './createshow-routing.module';

import { CreateshowPage } from './createshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateshowPageRoutingModule
  ],
  declarations: [CreateshowPage]
})
export class CreateshowPageModule {}
