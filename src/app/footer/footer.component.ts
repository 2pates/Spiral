import { Component } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  a = environment.a
  b = environment.b
  c = environment.c
  d = environment.d
}
