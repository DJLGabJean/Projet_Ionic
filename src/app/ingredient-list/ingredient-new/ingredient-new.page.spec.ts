import { ComponentFixture, TestBed} from '@angular/core/testing';
import { IngredientNewPage } from './ingredient-new.page';

describe('IngredientNewPage', () => {
  let component: IngredientNewPage;
  let fixture: ComponentFixture<IngredientNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngredientNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
