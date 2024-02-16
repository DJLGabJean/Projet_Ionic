import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Ingredient: IngredientService,
    private toastCtrl: ToastController,
    private router: Router,
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
    let errorMessage = '';
    if (this.ingredient.name.trim() === "") {
      errorMessage += '- Le champ "Nom" est obligatoire.\n';
    }
    if (this.ingredient.picturelink.trim() === "") {
      errorMessage += '- Le champ "Lien de l\'image" est obligatoire.\n';
    }
    if (this.ingredient.type === "") {
      errorMessage += '- Le champ "Type" est obligatoire.\n';
    }

    if (this.ingredient.tool === "" && this.ingredient.type !== "Matière première") {
      errorMessage += '- Le champ "Outil approprié" est obligatoire.\n';
    }

    if (errorMessage === "") {
      this.Ingredient.update(this.ingredient).subscribe(() => {
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

  hiddenField(fieldName: string): boolean {
    switch (this.ingredient.type) {
      case 'Matière première':
        return ['name', 'picturelink', 'type', 'renewable', 'experience'].includes(fieldName);
      case 'Bloc':
        // Inclure tous les champs pour le type "Bloc"
        return true;
      default:
        return false;
    }
  }

  isFieldAuthorized(fieldName: string): boolean {
    if (this.ingredient.type === 'Matière première') {
      return fieldName ==='name' || fieldName === 'type' || fieldName === 'picturelink' || fieldName === 'experience' || fieldName === 'renewable';
    }
    return true; // Autoriser tous les champs pour le type "Bloc"
  }

  getYesNoValue(value: boolean): string {
    return value ? 'Oui' : 'Non';
  }
}

