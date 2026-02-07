import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { RecipeModel } from './models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly httpClient = inject(HttpClient);
  public readonly userId = signal('');

  public readonly listRecipesResource = httpResource<RecipeModel[]>(() => '/api/recipes', {
    defaultValue: [],
  });
  
  public readonly getRecipeResource = httpResource<RecipeModel>(() => {
    const userId = this.userId();
    if (userId === '') {
      return undefined;
    }
    return `/api/recipes/${userId}`;
  });

  public addRecipe(name: string, description: string): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>('/api/recipes', { name, description })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  constructor() { 
    effect(() => {
      if (this.listRecipesResource.status() === 'error') {
        this.handleError(this.listRecipesResource.error() as HttpErrorResponse);
      }
    });
    effect(() => {
      if (this.getRecipeResource.status() === 'error') {
        this.handleError(this.getRecipeResource.error() as HttpErrorResponse);
      }
    });
  }

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
