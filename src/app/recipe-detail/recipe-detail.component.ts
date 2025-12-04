import { Component, computed, inject, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetail {
  private readonly recipeService = inject(Recipe);
  private readonly routes = inject(ActivatedRoute);
  private readonly recipeId = signal<string | null>('');
  protected readonly recipe = computed(() => {
    const recipes = this.recipeService.getRecipes();
    const recipeId = this.recipeId();
    if (!recipeId) return null;
    return recipes.find((recipe) => recipe.id.toString() === recipeId) || null;
  })
  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() => 
    this.recipe()?.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * this.servings()
    }))
  );

  constructor() {
    this.recipeId.set(this.routes.snapshot.paramMap.get('recipeId'));
  }

  increaseServings() {
    this.servings.update(s => s + 1);
  }

  decreaseServings() {
    this.servings.update(s => s - 1);
  }
}
