import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [
    `
        :host ::ng-deep .p-password {
            display: block;
        }

        :host ::ng-deep .p-password-input {
          width: 100%;
          padding: 1rem;
          margin-bottom: 16px;
        }

        :host ::ng-deep .p-password .p-icon-wrapper {
          margin-top: -15px !important;
          cursor: pointer;
        }
    `
  ],
})

export class LoginComponent {

  greeting?: string;
  loginForm: FormGroup;
  loginStatusMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.setGreeting();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 4) {
      this.greeting = 'Bonsoir, il est tard !';
    } else {
      this.greeting = hour < 18 ? 'Bonjour,' : 'Bonsoir,';
    }
  }

  onSubmit() {

    this.loading = true;

    if (this.loginForm.invalid) {
      // Formulaire invalide, marquer tous les champs comme touchés pour afficher les messages d'erreur
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      this.loading = false;
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({

      next: (loginResponse) => {
        if (loginResponse.token) {
          // Set the authToken temporarily to make the subsequent getUserInfo call
          localStorage.setItem('authToken', loginResponse.token);

          this.authService.getUserInfo().subscribe({
            next: (userInfoResponse) => {
              // Store user information and tokens in localStorage
              localStorage.setItem('id_user', userInfoResponse.personal_info.id);
              localStorage.setItem('username', userInfoResponse.username);
              localStorage.setItem('firstname', userInfoResponse.user.first_name);
              localStorage.setItem('lastname', userInfoResponse.user.last_name);
              localStorage.setItem('username', userInfoResponse.username);
              localStorage.setItem('isadmin', userInfoResponse.user.isAdmin.toString());
              localStorage.setItem('refreshToken', loginResponse.refresh_token);
              console.log(localStorage.getItem('isadmin'));

              this.loading = false;
              this.router.navigateByUrl('/dashboard'); // Redirect to the dashboard
              console.log(this.authService.getRole());
            },
            error: (userInfoError) => {
              // Handle error from getUserInfo
              this.authService.logout();
              this.loading = false;
              this.loginStatusMessage = "Une erreur est survenue lors de la récupération des détails de l'utilisateur.";
              console.error(userInfoError);
            }
          });
        }
      },
      error: (loginError) => {

        this.loading = false;

        if (loginError.status === 400) {
          this.loginStatusMessage = loginError.error.error;
        } else {
          this.authService.logout();
          this.loginStatusMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    });
  }


}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/