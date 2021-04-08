import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook ,FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';

import {NetworkService} from '../service/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any = {email:"",first_name:""};
  connection : boolean = true;
  constructor(private fb: Facebook, private network :  NetworkService ,  private route :  Router) {
    //
    this.network.checkInternet();
  }

 ionViewDidEnter() {
 
 }
 

        
     login(){
    
    // this.fb.login(['public_profile', 'user_friends', 'email'])
    // .then((res: FacebookLoginResponse) =>{
    //    this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profil=>{
    //        console.log(profil);
    //        this.user = profil;

           this.route.navigateByUrl('home2');
           
      //  });
    // })
    // .catch(e => console.log('Error logging into Facebook', e));
  }
}
