import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  typeStructures : any = [];
  structures : any = [];
  regionsAnDept: any;
  allRegions : any = [];
  departements :any;
  struct : any;
  ville :any;
  structureForTypeStructure : any = [];
  constructor(private apiService : ApiService,private route: Router) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.allRegions =[
      {name:"Dakar"},{name:"Diourbel"},
     {name:"Fatick"},{name:"Kaffrine"},
     {name: "Kaolack"},{name:"Kédougou"},
      {name:"Louga"},{name:"Matam"},
      {name:"Saint_Louis"},
     {name: "Sédhiou"},{name:"Tambacounda"},
     { name:"Thiès"},{name:"Ziguinchor"}];
    this.regionsAnDept  = {
      Dakar : [
                {name:"Dakar","latitude": "14.71118", "longitude":"-17.5358661"},
                {name:"Guédiawaye","latitude": "14.7687671", "longitude":"-17.4184562"},
                {name:"Pikine","latitude": "14.7552617", "longitude":"-17.4044798"},
                {name:"Rufisque","latitude": "14.7155603", "longitude":"-17.2796838"}
               ],
      Diourbel:[
                {name:"Bambey","latitude": "14.6973732", "longitude":"-16.4745786"},
                {name:"Diourbel","latitude": "14.6543384", "longitude":"-16.2525346"},
                {name:"Mbacké","latitude": "14.7998603", "longitude":"-15.9241886"}
               
              ],
      Fatick :[
                {name:"Fatick","latitude": "14.3390167", "longitude":"-16.4111425"},
                {name:"Foundiougne","latitude": "14.122613", "longitude":"-16.4783121"},
                {name:"Gossas","latitude": "14.122613", "longitude":"-16.4783121"}
              ],
            
      Kaffrine : [
               {name:"Birkilane","latitude": "14.1309159", "longitude":"--15.7528479"},
               {name:"Kaffrine","latitude": "14.1048504", "longitude":"-15.5624213"},
               {name:"Malem-Hodar","latitude": "14.0884604", "longitude":"-15.3034148"},
               {name:"Koungheul","latitude": "13.9771107", "longitude":"-14.8092699"}
             ],
      Kaolack :[
              {"name":"Kaolack","latitude":"14.1573357" , "longitude":"-16.1048421" },
              {"name":"Guinguinéo","latitude": "14.269352", "longitude":"-15.96262"},
              {"name":"Nioro du Rip","latitude": "13.7453334", "longitude":"-15.7826688"}
              ],
      Kédougou:[
              {"name":"Kédougou","latitude":"12.8789036" , "longitude":"-12.8593252"},
              {"name":"Salemata","latitude":"12.6340568" , "longitude":"-12.8248001"},
              {"name":"Saraya","latitude":"12.835297" , "longitude":"-11.7650271"}
             ],
      Louga  :[
              {"name":"Kébémer","latitude":"15.3706036" , "longitude":"-16.4620688"},
              {"name":"Linguère","latitude":"15.3976035" , "longitude":"-15.1225091"},
              {"name":"Louga","latitude":"15.6173263" , "longitude":"-16.2558183" }
             ],
      Matam :[
              {"name":"Kanel","latitude":"15.4893016" , "longitude":"-13.1807612" },
              {"name":"Matam","latitude":"15.2729395" , "longitude":"-14.6957468" },
              {"name":"Ranérou","latitude":"15.2965415" , "longitude":"-13.9660264" }
            ],
     Saint_Louis :[
              {"name":"Dagana","latitude":"16.5147698" , "longitude":"-15.5126738" },
              {"name":"Saint-Louis","latitude":"16.0201092" , "longitude":"-16.5283402" },
              {"name":"Podor","latitude":"16.6606023" , "longitude":"-14.9786785" },
             ],
      Sédhiou :[
             {"name":"Sédhiou","latitude":"12.5336006" , "longitude":"-15.9528748" },
             {"name":"Bounkiling","latitude":"13.0382787" , "longitude":"-15.7074881" },
             {"name":"Goudomp","latitude":"12.5336006" , "longitude":"-15.9528748" },
  
            ],
      Tambacounda :[
             {"name":"Tambacounda","latitude":"13.770978" , "longitude":"-13.7041518" },
             {"name":"Goudiry","latitude":"14.1837833" , "longitude":"-12.7233482" },
             {"name":"Koumpentoum","latitude":"13.9805672" , "longitude":"-14.571004" },
             {"name":"Bakel","latitude":"14.9028398" , "longitude":"-12.4714138" },
           ] ,
      Thiès : [
           {"name":"Thiès","latitude":"14.7887202", "longitude":"-16.9973101" },
           {"name":"M'bour","latitude":"14.4165756", "longitude":"-17.0047211" },
           {"name":"Tivaouane","latitude":"14.9500909", "longitude":"-16.8322887" }
         ],
      Ziguinchor:[
          {"name":"Ziguinchor","latitude":"12.5599822" , "longitude":"-16.3092032" },
          {"name":"Bignogna","latitude":"12.8687066" , "longitude":"-16.6271735" },
          {"name":"Oussouye","latitude":"12.4902763" , "longitude":"-16.5529204" },
      ]
     
    }
 
   // liste type structures
   this.typeStructures = [
    {id: 2 , type:'Banque'},
    {id: 3 , type:'Entreprise'},
    {id: 6 , type:'Societé commercial'},
  ];

 //liste des structure
  this.structures = [
    {id: 1 ,name: 'Bicis' ,logo:'',type:2},
    {id: 2 ,name: 'ECOBANK' ,logo:'',type:2},
    {id: 3 ,name: 'BOA' ,logo:'',type:2},
    {id: 4 ,name: 'ORANGE' ,logo:'',type:3},
    {id: 5 ,name: 'TIGO' ,logo:'',type:3},
    {id: 6 ,name: 'EXPRESSO' ,logo:'',type:3},
    {id: 7 ,name: 'SDE' ,logo:'',type:6},
    {id: 8 ,name: 'SENELEC' ,logo:'',type:6},
];

}

getTypeStrcuture(ev){
  console.log(ev.target.value);
  this.structures.forEach(el => {
      if(el.type == ev.target.value )
      {
        this.structureForTypeStructure.push(el);
      }
  });
 
  
}

getRegion(ev){
  this.departements = Object.getOwnPropertyDescriptor(this.regionsAnDept,ev.target.value);
  this.departements = this.departements.value;
  console.log(this.departements);
  
}


recherche(){
  
  console.log('ville', this.ville);
  console.log('structure',this.struct);
  let infos = {
    ville : this.ville,
    structure : this.struct
  }
  const navigationExtras: NavigationExtras = {
    queryParams: {
      data: JSON.stringify(infos),
    }
  };
  this.route.navigate(['/liste-agences'], navigationExtras);
}



}
