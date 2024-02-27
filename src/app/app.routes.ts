import {Routes} from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { HeroesComponent } from './heroes/heroes.component';

export const routes = [
    {path: '', component: HeroesComponent},
    {path: 'sinformer', component: ThemeComponent},
    {path: 'reduire', component: ThemeComponent},
    {path: 'reutiliser', component: ThemeComponent},
    {path: 'substituer', component: ThemeComponent}
];