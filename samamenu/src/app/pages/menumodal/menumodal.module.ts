import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenumodalPageRoutingModule } from './menumodal-routing.module';

import { MenumodalPage } from './menumodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenumodalPageRoutingModule
  ],
  declarations: [MenumodalPage]
})
export class MenumodalPageModule {}
