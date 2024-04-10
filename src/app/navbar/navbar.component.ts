import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  a = environment.a;
  b = environment.b;
  c = environment.c;
  d = environment.d;

  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService
      .signOut()
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erreur de déconnexion:', error);
      });
  }
}
