import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RecipeModel } from './models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly httpClient = inject(HttpClient);

  public listRecipes(): Observable<RecipeModel[]> {
    return this.httpClient.get<RecipeModel[]>('/api/recipes')
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  public getRecipe(id: number): Observable<RecipeModel> {
    return this.httpClient.get<RecipeModel>(`/api/recipes/${id}`)
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  public addRecipe(name: string, description: string): Observable<{id: number}> {
    return this.httpClient.post<{id: number}>('/api/recipes', { name, description })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      )
  }

  private handleError(error: HttpErrorResponse) {
    // クライアント側あるいはネットワークによるエラー
    if (error.status === 0) {
      console.error('An error occurred:', error.error.message);
      // サーバー側から返却されるエラー
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error);
    }
    // エラーメッセージの返却
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
