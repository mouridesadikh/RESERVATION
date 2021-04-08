import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetWorkPagePageRoutingModule } from './net-work-page-routing.module';

import { NetWorkPagePage } from './net-work-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetWorkPagePageRoutingModule
  ],
  declarations: [NetWorkPagePage]
})
export class NetWorkPagePageModule {}
