import { Component } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spiral';
  heroes = {
    a: "s'informer",
    b: "réduire",
    c: "réutiliser",
    d: "substituer"
  }
}


