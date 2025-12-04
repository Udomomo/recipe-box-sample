import { Injectable } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  public getRecipes() {
    return MOCK_RECIPES;
  }

  public addRecipe(name: string, description: string) {
    const newRecipe: RecipeModel = {
      id: MOCK_RECIPES.length + 1,
      name,
      description,
      imgUrl: `https://placehold.co/300x200.png?text=${name.replace(' ', '+')}`,
      isFavorite: false,
      ingredients: [],
    }
    console.log(newRecipe)
    MOCK_RECIPES.push(newRecipe);
  }
}
