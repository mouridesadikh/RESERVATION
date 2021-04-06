import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : any;
  password : any;
  loginForm : FormGroup;

  constructor(private apiService : ApiServiceService,
             private storage : Storage,private route :Router,
             private toast : ToastController,private loading : LoadingController) { 
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
     this.storage.get('user_infos').then(rs=>{
           if(rs){
            this.route.navigateByUrl('admin');
           }
     });
  }
  async presentToast(message){
     const toast = await this.toast.create({
         message : message,
         position:'top',
         color :  "red",
         duration : 20000

     });
     await toast.present();
  }
  goToBack(){
    this.route.navigateByUrl('/');
  }

  async onSubmit(){

    const loading = await this.loading.create({
         message:"Patientez s'il vous plait",
         //backdropDismiss : true,
         duration : 2000,
         spinner :'lines'
         
    });
     loading.present();
    this.apiService.auth(this.email,this.password).
        pipe(
             finalize(()=>loading.dismiss())
        )
        .subscribe(res=>{
           console.log(res);
           if(res.length > 0){
            this.storage.set('user_infos',res);
            this.route.navigateByUrl('admin');
           }else{
            this.presentToast("Login ou mot de passe incorrect")
           }
          
           
    });
  }
  

}
