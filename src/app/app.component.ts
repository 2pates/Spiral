import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Spiral';
  category = {
    a: environment.a,
    b: environment.b,
    c: environment.c,
    d: environment.d,
  };
}
