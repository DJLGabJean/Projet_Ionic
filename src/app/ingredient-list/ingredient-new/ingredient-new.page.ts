
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
  public ingredient!: Ingredient;
  public newVariant: string = '';

  constructor(
    private Ingredient: IngredientService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    this.ingredient = new Ingredient();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau Film enregistré',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/films']);
      }, 2000);
    });
  }

  add() {
    this.Ingredient.saveNewIngredient(this.ingredient).subscribe(() => {
      this.ingredient = new Ingredient();
      this.presentToast();
    });
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
}
