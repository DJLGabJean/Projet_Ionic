import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.page.html',
  styleUrls: ['./ingredient-list.page.scss'],
})
export class IngredientListPage implements OnInit {
  ingredients!: Array<Ingredient>;

  constructor(
    private Ingredient: IngredientService
  ) { }

  ngOnInit() {
    this.Ingredient.getAll().subscribe((data: any) => {
      this.ingredients = data;
    });
  }

}

