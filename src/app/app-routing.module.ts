import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab/tab.module').then(m => m.TabPageModule)
  },
  {
    path: 'ingredient-list',
    loadChildren: () => import('./ingredient-list/ingredient-list.module').then( m => m.IngredientListPageModule)
  },
  {
    path: 'recipe-list',
    loadChildren: () => import('./recipe-list/recipe-list.module').then( m => m.RecipeListPageModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
