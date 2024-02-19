import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeNewPageRoutingModule } from './recipe-new-routing.module';

import { RecipeNewPage } from './recipe-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeNewPageRoutingModule
  ],
  declarations: [RecipeNewPage]
})
export class RecipeNewPageModule {}
