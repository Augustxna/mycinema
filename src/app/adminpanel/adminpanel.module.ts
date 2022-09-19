import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminpanelPageRoutingModule } from './adminpanel-routing.module';

import { AdminpanelPage } from './adminpanel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    AdminpanelPageRoutingModule
  ],
  declarations: [AdminpanelPage]
})
export class AdminpanelPageModule {}
