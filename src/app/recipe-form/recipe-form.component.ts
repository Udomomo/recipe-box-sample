import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeForm {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);
  protected readonly formGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.recipeService.addRecipe(this.formGroup.getRawValue().name, this.formGroup.getRawValue().description).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}