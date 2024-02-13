import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientListPageRoutingModule } from './ingredient-list-routing.module';

import { IngredientListPage } from './ingredient-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientListPageRoutingModule
  ],
  declarations: [IngredientListPage]
})
export class IngredientListPageModule {}
