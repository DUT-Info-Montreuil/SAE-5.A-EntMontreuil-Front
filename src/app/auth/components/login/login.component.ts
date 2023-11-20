import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  loginStatusMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response.token) {

          // Stocker les informations de l'utilisateur et le token dans le localStorage
          localStorage.setItem('id_user', response.id_user);
          localStorage.setItem('first_name', response.first_name);
          localStorage.setItem('last_name', response.last_name);
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('refreshToken', response.refresh_token);

          this.router.navigateByUrl('/dashboard'); // Rediriger l'utilisateur vers le tableau de bord
        }
      },
      error: (error) => {
        if (error.status === 400) {
          // Ici, on utilise error.error.error car la structure de l'erreur est { error: { error: "message" } }
          this.loginStatusMessage = error.error.error;
        } else {
          this.loginStatusMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    });
  }


}
