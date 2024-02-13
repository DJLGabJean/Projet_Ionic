import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientListPage } from './ingredient-list.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./ingredient-new/ingredient-new.module').then( m => m.IngredientNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./ingredient/ingredient.module').then( m => m.IngredientPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientListPageRoutingModule {}
