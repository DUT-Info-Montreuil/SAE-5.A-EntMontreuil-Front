import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  loginStatusMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    // Marquer tous les champs comme touchés
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.loginForm.invalid) {
      return;
    }

    // Si le formulaire est valide
    const loginFormData = this.loginForm.value;
    const jsonLoginFormData = JSON.stringify(loginFormData);

    this.http.post<LoginResponse>('https://run.mocky.io/v3/e4cf7bce-c8ab-42ea-ab67-8348f622fedb', jsonLoginFormData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: (response) => {
          if (response && response.success === "true") {
            this.loginStatusMessage = 'Connexion réussie';
          } else {
            this.loginStatusMessage = 'Identifiant ou mot de passe incorrect.';
          }
        },
        error: (error) => {
          this.loginStatusMessage = 'Erreur interne du serveur.';
        }
      });

  }
}

interface LoginResponse {
  success: string;
  message: string;
}