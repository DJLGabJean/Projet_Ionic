import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { IngredientService } from 'src/app/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {
  modif: boolean = false;
  ingredient!: Ingredient;
  newVariant: string = '';
  allExperience: string = '';
  screenSize: string = '';

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Ingredient: IngredientService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Ingredient.get(id).subscribe((value: any) => {
      this.ingredient = value;
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
    this.Ingredient.update(this.ingredient).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any) {
    this.Ingredient.delete(id);
    this.router.navigate(['/ingredient']);
  }

  removeVariant(variant: string) {
    this.ingredient.variants = this.ingredient.variants.filter(item => item !== variant);
  }

  addVariant() {
    if (this.newVariant && !this.ingredient.variants.includes(this.newVariant)) {
      this.ingredient.variants.push(this.newVariant);
      this.newVariant = '';
    }
  }

  isFieldAuthorized(fieldName: string): boolean {
    switch (this.ingredient.type) {
      case 'Matière première':
        return ['picturelink', 'type', 'renewable', 'experience'].includes(fieldName);
      case 'Bloc':
        // Inclure tous les champs pour le type "Bloc"
        return true;
      default:
        return false;
    }
  }

  getExperienceKeys(): string[] {
    if (this.ingredient.experience) {
      return Object.keys(this.ingredient.experience);
    } else {
      return [];
    }
  }

  getYesNoValue(value: boolean): string {
    return value ? 'Oui' : 'Non';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenSize = window.innerWidth < 768 ? 'small-screen' : 'large-screen';
  }
}

