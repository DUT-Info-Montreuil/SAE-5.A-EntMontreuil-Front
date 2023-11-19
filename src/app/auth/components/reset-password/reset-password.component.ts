import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  resetStatusMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {

    // Marquer tous les champs comme touchés
    Object.keys(this.resetForm.controls).forEach(field => {
      const control = this.resetForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.resetForm.invalid) {
      return;
    }

    // Si le formulaire est valide
    const resetFormData = this.resetForm.value;
    const jsonResetFormData = JSON.stringify(resetFormData);

    this.http.post<ResetResponse>('https://run.mocky.io/v3/e4cf7bce-c8ab-42ea-ab67-8348f622fedb', jsonResetFormData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: (response) => {
          if (response && response.success === "true") {
            this.resetStatusMessage = 'Si un compte existe avec cet identifiant, un email a été envoyé.';
          }
        },
        error: (error) => {
          this.resetStatusMessage = 'Erreur interne du serveur.';
        }
      });

  }
}

interface ResetResponse {
  success: string;
  message: string;
}