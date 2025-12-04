export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeModel {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  isFavorite: boolean; // Add this line
  ingredients: Ingredient[];
}