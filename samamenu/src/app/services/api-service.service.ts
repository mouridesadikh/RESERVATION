import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const HttpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
       "Accept": 'application/json'
      //'dataType': 'JSON'
    })
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 
  constructor(private http : HttpClient) {

    
   }

   getSpecialite(): Observable<any>{
    return this.http.get(environment.API_URL+"/api/index/specialite", HttpOptions);
  }


  // Check connection
  auth(username: string, password: string) :Observable<any> {
    return this.http.post(environment.API_URL+ "/api/index/auth",{email:username,password:password});
  }

  changeStatus(id:any,status:any){
    return this.http.post(environment.API_URL+ "/api/index/change_status",{id:id,status:status});
  }


  //menu
  addMenu(objet){
    return this.http.post(environment.API_URL+ "/api/index/add_menu",{menu:objet});
  }

  getMenu(id){
    return this.http.post(environment.API_URL+ "/api/index/get_menu",{id:id});
  }
  
  deleteMenu(id){
    return this.http.post(environment.API_URL+ "/api/index/delete_menu",{id:id});
  }

  deletePlatOfMenu(id){
    return this.http.post(environment.API_URL+ "/api/index/delete_plat_menu",{id:id});
  }

  //recherche  restaurant by plat


  getRestaurantByPlat(id){
    return this.http.post(environment.API_URL+ "/api/index/restaurant/plat",{id:id});
  }


}
