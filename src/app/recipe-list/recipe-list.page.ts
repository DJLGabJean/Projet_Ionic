import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  recipes!: Array<Recipe>;

  constructor(
    private Recipe: RecipeService
  ) { }

  ngOnInit() {
    this.Recipe.getAll().subscribe((data: any) => {
      this.recipes = data;
    });
  }

}
