import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeNewPage } from './recipe-new.page';

describe('RecipeNewPage', () => {
  let component: RecipeNewPage;
  let fixture: ComponentFixture<RecipeNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
