import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-infos-agence',
  templateUrl: './infos-agence.page.html',
  styleUrls: ['./infos-agence.page.scss'],
})
export class InfosAgencePage implements OnInit {

  constructor(private modaCtrl : ModalController) { }
  @Input() public infos : any;
  ngOnInit() {
    console.log("ici" ,this.infos);
    
  }

  closeModal(){
    this.modaCtrl.dismiss();
  }

}
