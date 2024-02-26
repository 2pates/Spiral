import { Component } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  a = environment.a
  b = environment.b
  c = environment.c
  d = environment.d
}

