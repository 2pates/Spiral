import { Routes } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { HeroesComponent } from './heroes/heroes.component';

export const routes = [
  { path: '', component: HeroesComponent },
  { path: 'sinformer', component: ResourceComponent },
  { path: 'reduire', component: ResourceComponent },
  { path: 'reutiliser', component: ResourceComponent },
  { path: 'substituer', component: ResourceComponent },
];
