import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RouterLink } from '@angular/router';
import { RecipeModel } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);

  protected readonly pageTitle = signal('My Recipe Box');
  protected readonly keyword = signal('')
  protected readonly recipes = signal<RecipeModel[]>([]);

  constructor() {
    this.recipeService.listRecipes().pipe(takeUntilDestroyed()).subscribe((recipes) => {
      this.recipes.set(recipes);
    });
  }

  readonly filteredRecipes = computed(() => {
    return this.recipes().filter(recipe => recipe.name.toLowerCase().includes(this.keyword().toLowerCase()))
  })
}
