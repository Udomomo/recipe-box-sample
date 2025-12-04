import {Routes} from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list.component';
import { RecipeDetail } from './recipe-detail/recipe-detail.component';
import { RecipeForm } from './recipe-form/recipe-form.component';

export const routes: Routes = [
    {
        path: 'recipes',
        pathMatch: 'full',
        loadComponent: (() => RecipeList),
    },
    {
        path: 'recipes/new',
        loadComponent: (() => RecipeForm),
    },
    {
        path: 'recipes/:recipeId',
        loadComponent: (() => RecipeDetail),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recipes',
    }
];
