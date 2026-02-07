import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetail {
  private readonly recipeService = inject(RecipeService);

  // withComponentInputBindingを設定しているので、ルートパラメータをinputで受け取れる
  protected readonly recipeId = input.required<string>()
  
  protected readonly recipe = signal<RecipeModel | null>(null);
  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() =>
    this.recipe()?.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * this.servings()
    }))
  );

  constructor() {
    effect(() => {
      const recipe = this.recipeService.getRecipe(this.recipeId());
      this.recipe.set(recipe() || null);
    });
  }

  increaseServings() {
    this.servings.update(s => s + 1);
  }

  decreaseServings() {
    this.servings.update(s => s - 1);
  }
}
