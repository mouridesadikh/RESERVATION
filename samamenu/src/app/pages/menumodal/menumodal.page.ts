import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-menumodal',
  templateUrl: './menumodal.page.html',
  styleUrls: ['./menumodal.page.scss'],
})
export class MenumodalPage implements OnInit {
  resto_infos : any = [];
  specialite : any = [];
  alldata : any = [];
  plat : any =[];
  menu: any = [];
  status = true;
  constructor(private modal : ModalController,   private apiService : ApiServiceService,private loading :LoadingController,
    private alertCtr: AlertController,private toast : ToastController) { }

  ngOnInit() {
  }

  async valider(){
    this.modal.dismiss(this.menu);
  }

  ionViewDidEnter(){
    this.chargeData();
  }
  
  async presentost(message){
    const tt =  await this.toast.create({
      message : message,
      duration : 2000,
      position : 'top'
    });
    tt.present();
      
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
      console.log(rs);
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

      this.plat = [];
      let buffer : any = this.alldata[0];
      console.log(buffer);
      buffer.plat.forEach(el => {
        el.prix = 0;
        el.status = 'false';
        this.plat.push(el);
      });
  
     
      
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
                //this.presentost(data);
                this.plat = [];
                let buffer : any = this.alldata.find(x=>x.id == data);
                console.log(buffer);
                buffer.plat.forEach(el => {
                  el.prix = 0;
                  el.status = 'false';
                  this.plat.push(el);
                });
               //this.presentost(this.plat);
               this.menu = [];
             
              }
            }
          ]
        });
  
        alert.present();
    }

    async addMenu(item){
      console.log("menu",this.menu);
      console.log("plat",this.plat)
      console.log("=======>",item.status);
      

      if(item.status != "true" )
      {
          console.log("infos 1");
          
          item.status = false;
          console.log('here 1 ');
          
          const alert = await this.alertCtr.create({
            header: 'Prix',
            inputs: [
              {
                label: 'Prix plat',
                type: 'text',
            
              }
            ],
            cssClass: 'four-button-alert',
            buttons: [
              {
                text: 'Valider',
                handler: (data) => {
            
                  // console.log();
                  
                  if(data[0]!== "")
                  {
                    item.prix = data[0];
                    this.menu.push(item);
                    //let buffer : any = [];
                    this.plat.forEach(el => {
                     if(el.id == item.id){
                       item.status = 'true';
                       }
                     });
                     alert.dismiss();
                     
                  }else{
                     this.presentost('Veuillez saisir le prix svp ');
                     this.addMenu(item);
                  }
               
                  
                  
               
                }
              }
            ]
          });
         await alert.present();
      }else{
         console.log(this.menu.length);
         
         if(this.menu.length>0){

            let buffer :any = [];
            this.menu.forEach(el => {
               if(el.id != item.id)
               {
                 buffer.push(el);
               }
            });
            this.menu = buffer;
            this.plat.forEach(el => {
              if(el.id == item.id){
                item.status = 'false';
                }
              });
         }else{
           this.menu = this.menu;
           this.plat = this.plat;
         }
      }
  }

}
