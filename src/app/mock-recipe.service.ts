import { Injectable } from '@angular/core';
import { RecipeModel } from './models';
import { Observable, of } from 'rxjs';

/**
 * テスト用に使うRecipeServiceのモック実装
 */
@Injectable()
export class MockRecipeService {
  public listRecipes(): Observable<RecipeModel[]> {
    return of(MOCK_RECIPES);
  }

  public getRecipe(id: number): Observable<RecipeModel> {
    const recipe = MOCK_RECIPES.find(r => r.id === id) || null;
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return of(recipe);
  }

  public addRecipe(name: string, description: string): Observable<number> {
    const newRecipe: RecipeModel = {
      id: MOCK_RECIPES.length + 1,
      name,
      description,
      imgUrl: `https://placehold.co/300x200.png?text=${name.replace(' ', '+')}`,
      isFavorite: false,
      ingredients: [],
    }
    MOCK_RECIPES.push(newRecipe);
    return of(newRecipe.id);
  }
}

const MOCK_RECIPES: RecipeModel[] = [
  {
    id: 1,
    name: 'Mock Spaghetti Carbonara',
    description: 'A mock Italian pasta dish.',
    imgUrl: 'https://placehold.co/300x200.png?text=Spaghetti+Carbonara',
    isFavorite: true, // Add this line
    ingredients: [
      { name: 'Spaghetti', quantity: 200, unit: 'g' },
      { name: 'Guanciale', quantity: 100, unit: 'g' },
      { name: 'Egg Yolks', quantity: 4, unit: 'each' },
      { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
      { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    id: 2,
    name: 'Mock Caprese Salad',
    description: 'A simple and refreshing mock Italian salad.',
    imgUrl: 'https://placehold.co/300x200.png?text=Caprese+Salad',
    isFavorite: false, // Add this line
    ingredients: [
      { name: 'Tomatoes', quantity: 4, unit: 'each' },
      { name: 'Fresh Mozzarella', quantity: 200, unit: 'g' },
      { name: 'Fresh Basil', quantity: 1, unit: 'bunch' },
      { name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp' },
    ],
  },
];