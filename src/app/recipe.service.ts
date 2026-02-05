import { computed, effect, inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { RecipeModel } from './models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly httpClient = inject(HttpClient);
  private readonly recipeResource = httpResource<RecipeModel[]>(() => '/api/recipes');

  public readonly recipes = computed(() => {
    if (this.recipeResource.status() === 'error') {
      this.handleError(this.recipeResource.error() as HttpErrorResponse);
      return [];
    }
    return this.recipeResource.value() ?? [];
  });

  public getRecipe(id: number): Observable<RecipeModel> {
    return this.httpClient.get<RecipeModel>(`/api/recipes/${id}`)
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  public addRecipe(name: string, description: string): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>('/api/recipes', { name, description })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  constructor() { }

  private handleError(error: HttpErrorResponse) {
    // クライアント側あるいはネットワークによるエラー
    if (error.status === 0) {
      console.log('An error occurred:', error.error.message);
      // サーバー側から返却されるエラー
    } else {
      console.log(`Backend returned code ${error.status}, reason: ${error.error.message}`);
    }
    // エラーメッセージの返却
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
