import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
   user_data : any ;
   url : string;
  constructor(private loading : LoadingController,private storage : Storage,
              private route :Router,private apiService: ApiServiceService,private toast : ToastController) {
        this.url = environment.API_URL;
   }

  ngOnInit() {
    this.getUserInfos();
  }


  async presentToast(message){
    const toast = await this.toast.create({
        message : message,
        position:'top',
       // color :  "red",
        duration : 2000

    });
    await toast.present();
 }

  async dorefresh() {
    const loading = await this.loading.create({
      message:"Patientez s'il vous plait",
      //backdropDismiss : true,
      spinner :'lines'
            
      });
        loading.present();
    this.apiService.auth(this.user_data.email,"").
        pipe(
             finalize(()=>loading.dismiss())
        )
        .subscribe(res=>{
          
          // this.presentToast(res[0].restaurant[0].status);
           if(res.length > 0){
            this.storage.set('user_infos',res);
            this.user_data = res[0];
           }
          
           
    });
  }

  async getUserInfos(){
    const loading = await this.loading.create({
      message:"Patientez s'il vous plait",
      //backdropDismiss : true,
      spinner :'lines'
      
     });
     loading.present();

     const recup = this.storage.get('user_infos');
     from(recup).pipe(
        finalize(()=>loading.dismiss())
     ).subscribe(rs=>{
        this.user_data = rs[0];
        console.log(this.user_data);
        
       
     });
  }

  goToRestaurantsList(restaurant){
        console.log(restaurant);
        
  }

  logout(){
    this.storage.clear();
    this.route.navigateByUrl('login');
  }

  showDetaille(item){
    console.log(item);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        resto: JSON.stringify(item),
      }
    };
    this.route.navigate(['/menu'], navigationExtras);
    
  }

  changeStatus(item){
    console.log(item);
    
    let new_status :any  = item.status == 'true' ? 'false' : 'true';
   // this.presentToast(item.id);
    this.apiService.changeStatus(item.id,new_status).subscribe(rs=>{
      this.dorefresh();
    });
         


  }

}
