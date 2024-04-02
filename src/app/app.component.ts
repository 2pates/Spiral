import { Component } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import * as firebase from "firebase/app"; 
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Spiral';
  heroes = {
    a: environment.a,
    b: environment.b,
    c: environment.c,
    d: environment.d
  }

}



