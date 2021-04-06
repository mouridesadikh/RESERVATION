import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';

import {Geolocation} from'@ionic-native/geolocation/ngx';
import {Map,tileLayer,marker,polyline,PointTuple,map} from 'leaflet';
import { finalize } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.page.html',
  styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {
  id :any ;
  map:Map;
  marker:any;
  latLong = [];
  mayrecherch : any = [];
  url : string;
  constructor(private activeRoute : ActivatedRoute , private toast : ToastController,private route : Router ,
             private storage : Storage,
             private apiService :  ApiServiceService,private alertController :AlertController,
             private geolocation : Geolocation , private  loading :LoadingController) { 
              this.url = environment.API_URL;
             }

  ngOnInit() {
    
   
  }


  async presentost(message){
    const tt =  await this.toast.create({
      message : message,
      duration : 2000,
      position : 'top'
    });
    tt.present();
      
  }
  ionViewWillLeave() {
    this.map.remove();
  }
  ionViewDidEnter(){
   
    this.activeRoute.queryParams.subscribe(params=>{
      this.id = JSON.parse(params.plat);
      this.presentost(params.plat);

      console.log(this.id);
      this.apiService.getRestaurantByPlat(this.id).subscribe(rs=>{
        this.mayrecherch = rs;
        
      });
      
      
    });
    this.getPosition();
  }

 async getPosition(){


   
    const loading = await this.loading.create({
      message : 'Patientez svp ...',
      duration:30000,
      spinner: "circles"
    });

    (await loading).present();
    const resup =  this.geolocation.getCurrentPosition({
      enableHighAccuracy: false
    });

    from(resup).pipe(
      finalize(()=>{
        loading.dismiss();
      })
    ).subscribe(rs=>{
        console.log(rs.coords);
         //this.map = new Map('mapId').setView([rs.coords.latitude,rs.coords.longitude],15);
         this.map = map('mapId',{center:PointTuple,zoom : 15});
         tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{attribution:''}).addTo(this.map);
         this.latLong = [
          rs.coords.latitude,
          rs.coords.longitude
         ]
         this.addMarker(this.latLong);
        
    });
  }


  addMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map).bindPopup("sante serigne bi");
  }


  retour(){

    this.route.navigateByUrl('tab2');
  }

  async voirmenu(item){
    console.log(item);

    let menu :  any = [];

    let cpt = 0;
    item.forEach(e => {
    //  menu = menu+"<tr><td>"+e.libelle+"</td><td>"+e.prix+"</td></tr>";
      menu[cpt] = 
      {name: 'checkbox'+cpt,  
      type: 'checkbox',  
      label: e.libelle  +" ("+e.prix+" F cfa)",  
      value: e.libelle,  
      checked: true,  
      disabled : true,
      };
      cpt++;
    });
   
    const prompt= await this.alertController.create({
      header: 'Menu du jour',
      message:  '06/04/2021',
      inputs : menu,
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: async (data:any) => {
            if(data.itemtext==""){
           //   prompt.setMessage("text should not be empty");
              return false;
            }
            else{
            console.log("data.itemtext");
            }
          }
        }
      ]
    });
    await prompt.present();
  }

  favorit(item){
           this.storage.get("favorit").then(rs=>{
             console.log();
             
           // this.storage.remove('favorit');
             if(rs.length == undefined && rs != null){
                
                this.storage.set('favorit',[rs,item]);
             }else{
               this.storage.set('favorit',[item]);
             }

             this.presentost("Restaurant" +item.nom + " est  ajouté à la liste des favorit");
           })
  }

}
