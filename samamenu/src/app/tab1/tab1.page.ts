import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listFavorit : any = [];
  url : string;
  constructor(private route : Router,private storage :  Storage) {
    this.url = environment.API_URL;
    this.storage.get('favorit').then(rs=>{
     // if(rs){
        console.log(rs);
        
        this.listFavorit = rs;
    //  }
    });
  }



  goToRechereche(){
    this.route.navigateByUrl('tab2');
  }

  goToLoginPage(){
    this.route.navigateByUrl('login');
  }
}
