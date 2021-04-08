import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetWorkPagePage } from './net-work-page.page';

const routes: Routes = [
  {
    path: '',
    component: NetWorkPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetWorkPagePageRoutingModule {}
