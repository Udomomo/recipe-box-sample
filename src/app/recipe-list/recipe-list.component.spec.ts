import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeList } from './recipe-list.component';
import { MockRecipeService } from '../mock-recipe.service';
import { RecipeService } from '../recipe.service';
import { provideRouter } from '@angular/router';

describe('RecipeListComponent', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
      providers: [
        { provide: RecipeService, useClass: MockRecipeService },
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to filter recipes based on keyword', () => {
    component['keyword'].set('spaghetti');
    expect(component.filteredRecipes().length).toBe(1);
    expect(component.filteredRecipes()[0].name).toBe('Mock Spaghetti Carbonara');

    component['keyword'].set('Mock');
    expect(component.filteredRecipes().length).toBe(2);
    expect(component.filteredRecipes()[0].name).toBe('Mock Spaghetti Carbonara');
    expect(component.filteredRecipes()[1].name).toBe('Mock Caprese Salad');
  });
});
