import { Component, computed, inject, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetail {
  private readonly recipeService = inject(RecipeService);
  private readonly routes = inject(ActivatedRoute);
  private readonly recipeId = signal<string | null>('');
  protected readonly recipe = signal<RecipeModel | null>(null);
  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() =>
    this.recipe()?.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * this.servings()
    }))
  );

  constructor() {
    this.recipeId.set(this.routes.snapshot.paramMap.get('recipeId'));
    this.recipeService.getRecipe(Number(this.recipeId())).pipe(takeUntilDestroyed()).subscribe((recipe) => {
      this.recipe.set(recipe);
    });
  }

  increaseServings() {
    this.servings.update(s => s + 1);
  }

  decreaseServings() {
    this.servings.update(s => s - 1);
  }
}
