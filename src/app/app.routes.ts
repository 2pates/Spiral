import {Routes} from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';

export const routes = [
    {path: '', component: HomeComponent},
    {path: 'sinformer', component: ThemeComponent},
    {path: 'reduire', component: ThemeComponent},
    {path: 'reutiliser', component: ThemeComponent},
    {path: 'substituer', component: ThemeComponent}
];