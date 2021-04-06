import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { ApiServiceService } from 'src/app/services/api-service.service';
import {MenumodalPage} from 'src/app/pages/menumodal/menumodal.page';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  resto_infos : any = [];
  specialite : any = [];
  alldata : any = [];
  plat : any =[];
  menu : any = {};
  mymenu: any = [];
  constructor(private activeRoute : ActivatedRoute , private toast : ToastController,
              private storage : Storage,
              private route : Router,private modalCtr : ModalController,
              private apiService : ApiServiceService,private loading :LoadingController,
              private alertCtr: AlertController) { }

  ngOnInit() {
    
  }

  async modalMenu(){
    const modal = await this.modalCtr.create({
      component : MenumodalPage,
      backdropDismiss : false
     
    });
    
    
    modal.onWillDismiss().then(dataR=>{
     
       if(dataR.data){
          console.log(dataR.data);
          this.menu.idresto = this.resto_infos.id;
          this.menu.plat = dataR.data;
          console.log(this.menu);
          this.apiService.addMenu(this.menu).subscribe(rs=>{
             this.presentost(rs);
             if(rs == 'ok'){
               this.presentost("Menu ajouté")
               this.chargeData();
             }
          });
          
          
       }
      
   
    });
    return await modal.present().then(rs=>{
   
    });
  }
 async  presentAlert(){
     const alert = await this.alertCtr.create({
       message: "Etes vous sure de vouloire changer le menu",
       buttons :[
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
             
          }
        }, {
          text: 'Valider',
          handler: () => {
            this.apiService.deleteMenu(this.resto_infos)
            .pipe(
              finalize(()=>console.log(""))
            )
            .subscribe(rs=>{
              if(rs== 'ok')
              {
                this.modalMenu();
              }
             
            });
        
          }
        }
      
       ]
     });
    await alert.present();
  }
   
  async gotoChangeMenu(){

     this.storage.get('menu').then(rs=>{

        if(rs){
          this.presentAlert();
         }else{
           this.modalMenu();
         }
   

  });
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
      this.specialite = [];
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
      // this.storage.get('menu').then(rs=>{
      //    console.log(rs);
         
      //    if(rs == {}){
      //       this.mymenu = rs;
      //    }else{
          this.apiService.getMenu(this.resto_infos.id).subscribe(rs=>{
            this.mymenu = rs;
            console.log(this.mymenu);
           // this.storage.set('menu',this.mymenu);
            
         });
         //}
         console.log(this.mymenu);
         
     // });
   
     
      
    });
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
               // console.log("checked" ,data);
                this.presentost(data);
                this.goToPlat(data);
             
              }
            }
          ]
        });
  
        alert.present();
    }

    async goToPlat(id){
      console.log(this.alldata);
      this.plat = [];
     let buffer : any = this.alldata.find(x=>x.id == id);
     console.log(buffer);
     buffer.plat.forEach(el => {
       let bufer : any = {
         label: el.libelle,
         type: 'checkbox',
         value: el.id,
         checked: false
       };
       this.plat.push(bufer);
     });
    
   
   const alert = await this.alertCtr.create({
     header: 'Les Plats',
     inputs: this.plat,
     cssClass: 'four-button-alert',
     buttons: [
       {
         text: 'Valider le Menu',
         handler: (data) => {
           // handle the data returned from the alert here
           console.log("checked" ,data);
           let d : any = data.split(',');
          
           //this.presentost(d);
         //this.route.navigate(['/recherche'], navigationExtras);
        
         }
       }
     ]
   });
   
   alert.present();
         
   }

  async presentost(message){
    const tt =  await this.toast.create({
      message : message,
      duration : 2000,
      position : 'top'
    });
    tt.present();
      
  }
  ionViewDidEnter(){
    this.activeRoute.queryParams.subscribe(params=>{
      this.resto_infos = JSON.parse(params.resto);
      console.log(this.resto_infos);
      
    });
    this.chargeData();
  }
  goToBack(){
    this.route.navigateByUrl('admin');
  }


  async deletOnPlatInMenu(id){
    const alert = await this.alertCtr.create({
      message: "Etes vous sure de vouloire supprimer le plat",
      buttons :[
       {
         text: 'Annuler',
         role: 'cancel',
         cssClass: 'secondary',
         handler: (blah) => {
            
         }
       }, {
         text: 'Okay',
         handler: () => {

          this.apiService.deletePlatOfMenu(id).pipe(finalize(()=>console.log()
          )).subscribe(rs=>{
            this.chargeData();
          })
         
          
         }
       }
     
      ]
    });
   await alert.present();
        
         
  }

  

}
