import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  inform: Hero = {
    id: 1,
	  title: "S'informer",
	  description: "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.",
	  img: "https://www.adstriangle.com/blog/wp-content/uploads/2019/01/2-2-1024x640.png"
  }
  reduce: Hero = {
    id: 2,
	  title: "Réduire",
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "https://www.adstriangle.com/blog/wp-content/uploads/2019/01/2-2-1024x640.png"
  }
  reuse: Hero = {
    id: 3,
	  title: "Réutiliser",
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "https://www.adstriangle.com/blog/wp-content/uploads/2019/01/2-2-1024x640.png"
  }
  substitute: Hero = {
    id: 4,
	  title: "Substituer",
	  description: "Dignissimos molestiae quisquam asperiores temporibus amet. Modi dicta ad non. Qui doloremque dolore tempora libero eligendi ad. Nisi delectus deleniti modi expedita eligendi est at quisquam.",
	  img: "https://www.adstriangle.com/blog/wp-content/uploads/2019/01/2-2-1024x640.png"
  }
}






