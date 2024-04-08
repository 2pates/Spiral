import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        console.log('Connecté avec succès!');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
      });
  }
}
