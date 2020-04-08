import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,
              private alert : AlertController,
              private route: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  

  async search(){
    const alert5 = await this.alert.create({
      header: 'Recherche!',
      message: 'Veuillez choisir un mode de recherche?',
      cssClass: 'my-alerte',
      backdropDismiss: false,
      buttons: [
        {
          text: "Rechercher ",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.route.navigateByUrl('home');
          }
        }, {
          text: 'Géolocaliser',
          handler: () => {
                    
          }
        }
      ]
    });
    alert5.present();
  }

}
