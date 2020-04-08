import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {InfosAgencePage} from '../infos-agence/infos-agence.page';
@Component({
  selector: 'app-liste-agences',
  templateUrl: './liste-agences.page.html',
  styleUrls: ['./liste-agences.page.scss'],
})
export class ListeAgencesPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private modalCtr : ModalController) { }
 ville : any ;
 structure : any;
 lisetAgences :any = [];
 lisetAgences2 :any = [];
  ngOnInit() {
  }
 
   ionViewDidEnter(){
    this.lisetAgences = [
      {name: "agence 1" , nomStructure:"Bicis" , ville : "Malem-Hodar" , logo :"bicis.jpg"},
      {name: "agence 2" , nomStructure:"Bicis" , ville : "Malem-Hodar" , logo :"bicis.jpg"},
      {name: "agence 3" , nomStructure:"Bicis" , ville : "Malem-Hodar" , logo :"bicis.jpg"},
      {name: "agence 4" , nomStructure:"Bicis" , ville : "Malem-Hodar" , logo :"bicis.jpg"},
      {name: "agence 1" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 2" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"}, 
      {name: "agence 3" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 4" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 5" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"}, 
      {name: "agence 6" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 7" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 8" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"},
      {name: "agence 9" , nomStructure:"BOA" , ville : "Malem-Hodar" , logo :"boa.jpg"}
    ]
    this.activatedRoute.queryParams.subscribe(params => {
         if(params){
           let infos = JSON.parse(params.data);
           this.ville = infos.ville;
           this.structure= infos.structure;
           this.lisetAgences.forEach(el => {
              if(el.nomStructure == this.structure && el.ville == this.ville)
              {
                this.lisetAgences2.push(el);
              }
           });
           console.log(this.lisetAgences2);
           
         }
    });
   }

  async showAgence(item){
     console.log(item);
     const modal = await this.modalCtr.create({
      component : InfosAgencePage,
      backdropDismiss : false,
      componentProps : {
        infos : item,
      }
     
    });
 
    
    modal.onWillDismiss().then(dataR=>{
      console.log("comm" ,dataR);
       if(dataR){
      
       }
      
   
    });
    return await modal.present().then(rs=>{
      console.log(rs);
      
    });
     
   }
}
