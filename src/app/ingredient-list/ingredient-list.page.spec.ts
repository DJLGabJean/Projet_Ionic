import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientListPage } from './ingredient-list.page';

describe('IngredientListPage', () => {
  let component: IngredientListPage;
  let fixture: ComponentFixture<IngredientListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngredientListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
