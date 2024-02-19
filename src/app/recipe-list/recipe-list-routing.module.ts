import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListPage } from './recipe-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./recipe-new/recipe-new.module').then( m => m.RecipeNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeListPageRoutingModule {}
