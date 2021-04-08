import { Injectable } from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

   nework : any;
  constructor(private network : Network,private dialog : Dialogs,private loading :  LoadingController,private route: Router) { 


  }


  checkDisconect(){
    this.network.onDisconnect().subscribe(()=>{
      this.nework = this.network;
    })
  }

 checkConnect(){
    this.network.onConnect().subscribe(()=>{
      this.nework = this.network;
    });
    
  }


 async checkInternet(){
  const loading =  await this.loading.create({
    message : "Check conncetion ...",
    spinner: "circles",
    backdropDismiss: true,
    duration:2000


  });
   this.checkConnect();
   this.checkDisconect();
    loading.present();
    console.log(this.nework);
    if(this.nework === undefined){
        this.route.navigateByUrl('net-work-page');
    }else{
      this.route.navigateByUrl('home');
    }
    loading.dismiss;
    

  }
}
