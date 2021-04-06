import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenumodalPage } from './menumodal.page';

const routes: Routes = [
  {
    path: '',
    component: MenumodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenumodalPageRoutingModule {}
