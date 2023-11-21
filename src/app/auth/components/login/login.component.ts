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
  isLoading = false;

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

    this.isLoading = true;

    // Marquer tous les champs comme touchés
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.loginForm.invalid) {
      this.isLoading = false;
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
              localStorage.setItem('refreshToken', loginResponse.refresh_token);

              this.isLoading = false;
              this.router.navigateByUrl('/dashboard'); // Redirect to the dashboard
              console.log(this.authService.getRole());
            },
            error: (userInfoError) => {
              // Handle error from getUserInfo
              this.authService.logout();
              this.isLoading = false;
              this.loginStatusMessage = "Une erreur est survenue lors de la récupération des détails de l'utilisateur.";
              console.error(userInfoError);
            }
          });
        }
      },
      error: (loginError) => {

        this.isLoading = false;

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
