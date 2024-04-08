import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/app';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Méthode d'inscription avec email et mot de passe
  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Méthode de connexion avec email et mot de passe
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Méthode de déconnexion
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // Utilisez !! pour convertir user en un booléen
    );
  }
}
