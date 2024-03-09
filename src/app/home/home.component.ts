import { Component, HostListener } from '@angular/core';
import e from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentImage: string = 'https://fakeimg.pl/300x400?text=Image1'; // Chemin vers votre première image
  threshold_cat2: number = 30;
  threshold_cat3: number = 40;
  threshold_cat4: number = 50;

  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    /** Calcul des niveaux pour changer d'image */
    const totalHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    console.log('Scroll Percentage:', scrollPercentage);
  
    
    /** Changement d'image en fonction du pourcentage de scroll */
    if (scrollPercentage < this.threshold_cat2) {
      this.currentImage = 'https://fakeimg.pl/300x400/?text=Image1'; // Path to your second image
    } else if (scrollPercentage < this.threshold_cat3) {
      this.currentImage = 'https://fakeimg.pl/300x400/?text=Image2'; // Path to your first image
    } else if (scrollPercentage < this.threshold_cat4) {
      this.currentImage = 'https://fakeimg.pl/300x400/?text=Image3'; // Path to your third image
    } else{
      this.currentImage = 'https://fakeimg.pl/300x400/?text=Image4'; // Path to your first image
    }
  }
}
