import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditshowPageRoutingModule } from './editshow-routing.module';

import { EditshowPage } from './editshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditshowPageRoutingModule
  ],
  declarations: [EditshowPage]
})
export class EditshowPageModule {}
