
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IngredientService } from 'src/app/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredient-new',
  templateUrl: './ingredient-new.page.html',
  styleUrls: ['./ingredient-new.page.scss'],
})
export class IngredientNewPage implements OnInit {
  ingredient!: Ingredient;
  newVariant: string = '';

  constructor(
    private Ingredient: IngredientService,
    private toastCtrl: ToastController,
    private router : Router,
  ) {}

  ngOnInit() {
    this.ingredient = new Ingredient();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau ingrédient enregistré',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/ingredient']);
      }, 2000);
    });
  }

  add() {
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
      this.Ingredient.saveNewIngredient(this.ingredient).subscribe(() => {
        this.ingredient = new Ingredient();
        this.presentToast();
      });
    } else {
      const toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 5000
      });
      toast.then(toast => toast.present());
    }
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
    if (this.ingredient.type === 'Matière première') {
      return fieldName ==='name' || fieldName === 'type' || fieldName === 'picturelink' || fieldName === 'experience' || fieldName === 'renewable';
    }
    return true; // Autoriser tous les champs pour le type "Bloc"
  }
}
