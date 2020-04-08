import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosAgencePageRoutingModule } from './infos-agence-routing.module';

import { InfosAgencePage } from './infos-agence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosAgencePageRoutingModule
  ],
  declarations: [InfosAgencePage]
})
export class InfosAgencePageModule {}
