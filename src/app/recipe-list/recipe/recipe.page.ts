import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  @ViewChild('tableCraft', { read: ElementRef }) tableCraft!: ElementRef;
  modif: boolean = false;
  recipe!: Recipe;
  craftTablePositions: number[] = [];
  recipePositions: string[][] = [];

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Recipe: RecipeService,
    private toastCtrl: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Recipe.get(id).subscribe((value: any) => {
      this.recipe = value;
      this.Recipe.getPositionIngredients(this.recipe).subscribe((positions: string[][]) => {
        this.recipePositions = positions;
      });
    });
  }

  async setModif() {
    if(!this.modif) {
      const alert = await this.alertCtrl.create({
        header : 'Etes vous sûr de vouloir modifier cet ingrédient ?',
        subHeader: 'Vous serez rediriger sur la page de modification de cet ingrédient',
        buttons : [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => {this.modif = !this.modif}
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Vos modifications sont enregistrées',
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
    let errorMessage = '';
    if (this.recipe.name.trim() === "") {
      errorMessage += '- Le champ "Nom" est obligatoire.\n';
    }
    if (this.recipe.picturelink.trim() === "") {
      errorMessage += '- Le champ "Lien de l\'image" est obligatoire.\n';
    }

    if (errorMessage === "") {
      this.Recipe.update(this.recipe).subscribe(() => {
        this.presentToast();
        this.modif = false;
      });
    } else {
      const toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 5000
      });
      toast.then(toast => toast.present());
    }
  }

  onDelete(id: any) {
    this.Recipe.delete(id);
    this.router.navigate(['/recipe']);
  }

  ionViewDidEnter() {
    const tableCraft = document.querySelector('.table_craft');
    if (tableCraft) {
      const ionRows = tableCraft.querySelectorAll<HTMLIonRowElement>('ion-row');
      let index = 0;
      ionRows.forEach((row: HTMLIonRowElement) => {
        const ionCols = row.querySelectorAll<HTMLIonColElement>('ion-col');
        ionCols.forEach((col: HTMLIonColElement) => {
          col.textContent = this.recipePositions[index++][0];
        });
      });
    }
  }


  async saveIonRowsAsImages() {
    const tableCraft = document.querySelector('.table_craft');
    const recipeName = this.recipe.name;
    if (tableCraft) {
      const ionRows = tableCraft.querySelectorAll<HTMLIonRowElement>('ion-row');
      const toastPhotos = await this.toastCtrl.create({
        message: `Les photos des possibilités de recettes de ${recipeName} ont été ajoutées à votre galerie photo.`,
        duration: 4000
      });
      
  
      for (let index = 0; index < ionRows.length; index++) {
        const row = ionRows[index];
        const canvas = await html2canvas(row);
        const imageData = canvas.toDataURL('image/png');
        const toastPhoto = await this.toastCtrl.create({
          message: `Photo ${index} sauvegardée avec succès.`,
          duration: 1000
        });
  
        const fileName = `Recette_${recipeName}_${index}.png`; // Nommez chaque image de manière unique
        try {
          await Filesystem.writeFile({
            path: `${fileName}`,
            data: imageData,
            directory: Directory.Documents
          });
          await toastPhoto.present();
        } catch (error) {
          console.error(`Erreur lors de la sauvegarde de l'image ${fileName}:`, error);
        }
      }
      await toastPhotos.present();
    }
  }  
}
  
  
