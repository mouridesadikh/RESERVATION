import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  specialite : any =[];
  alldata : any = [];
  plat : any =[];

  constructor(private route : Router ,private loading : LoadingController, private alertCtr : AlertController,private httpc : HttpClient,private http : HTTP,
           private platform :Platform,private toast :ToastController,private apiService : ApiServiceService) {
            
           
           }
  ionViewDidEnter(){
    this.chargeData();
  }
  async chargeData(){
    const load = await this.loading.create({
      spinner : "bubbles",
      message : "chargement en cours ..."
    });
    load.present();
    this.apiService.getSpecialite().pipe(
      finalize(()=>{
        load.dismiss();
      })
    )
    .subscribe(rs=>{
      //console.log(rs);
      this.alldata = [];
      this.alldata = rs;
      rs.forEach(el => {
        let bufer : any = {
          label: el.libelle,
          type: 'radio',
          value: el.id,
          checked: false
        };
        this.specialite.push(bufer);
      });
  
     
      
    });
  }

async presentost(message){
  const tt =  await this.toast.create({
    message : message,
    duration : 2000,
    position : 'top'
  });
  tt.present();
    
}
 async goToPlat(id){
   console.log(this.alldata);
   
  let buffer : any = this.alldata.find(x=>x.id == id);
  console.log(buffer);
  buffer.plat.forEach(el => {
    let bufer : any = {
      label: el.libelle,
      type: 'radio',
      value: el.id,
      checked: false
    };
    this.plat.push(bufer);
  });
 

const alert = await this.alertCtr.create({
  header: 'Plats',
  inputs: this.plat,
  cssClass: 'four-button-alert',
  buttons: [
    {
      text: 'Valider',
      handler: (data) => {
        // handle the data returned from the alert here
        console.log("checked" ,data);
     
        const navigationExtras: NavigationExtras = {
          queryParams: {
            plat: JSON.stringify(data),
          }
        };
      this.route.navigate(['/recherche'], navigationExtras);
     
      }
    }
  ]
});

alert.present();
      
}
 async goToSpecialite(){

  // adjust button order in four button layout for ios
      
  
      const alert = await this.alertCtr.create({
        header: 'Spécialité',
        inputs: this.specialite,
        cssClass: 'four-button-alert',
        buttons: [
          {
            text: 'Valider',
            handler: (data) => {
              // handle the data returned from the alert here
              console.log("checked" ,data);
              this.presentost(data);
              this.goToPlat(data);
           
            }
          }
        ]
      });

      alert.present();
  }


  // go to back
  goToBack(){
    this.route.navigateByUrl('tabs');
  }

}
