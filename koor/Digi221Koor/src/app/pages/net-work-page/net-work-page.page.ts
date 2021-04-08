import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../../service/network.service';
@Component({
  selector: 'app-net-work-page',
  templateUrl: './net-work-page.page.html',
  styleUrls: ['./net-work-page.page.scss'],
})
export class NetWorkPagePage implements OnInit {

  constructor(private network : NetworkService) { }

  ngOnInit() {
  }


  refresh(){
      this.network.checkInternet();
  }

}
