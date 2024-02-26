import { Component } from '@angular/core';
import { Hero } from '../hero';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  inform: Hero = {
    id: 1,
	  title: environment.a,
	  description: "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.",
	  img: "https://www.adstriangle.com/blog/wp-content/uploads/2019/01/2-2-1024x640.png"
  }
  reduce: Hero = {
    id: 2,
	  title: environment.b,
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "../assets/planet1.png"
  }
  reuse: Hero = {
    id: 3,
	  title: environment.c,
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "../assets/planet2.png"
  }
  substitute: Hero = {
    id: 4,
	  title: environment.d,
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "../assets/planet3.jpg"
  }
}






