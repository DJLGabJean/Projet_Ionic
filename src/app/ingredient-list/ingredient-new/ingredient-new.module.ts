import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientNewPageRoutingModule } from './ingredient-new-routing.module';

import { IngredientNewPage } from './ingredient-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientNewPageRoutingModule
  ],
  declarations: [IngredientNewPage]
})
export class IngredientNewPageModule {}
