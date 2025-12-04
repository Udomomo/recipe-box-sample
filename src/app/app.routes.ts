import {Routes} from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeForm } from './recipe-form/recipe-form';

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
