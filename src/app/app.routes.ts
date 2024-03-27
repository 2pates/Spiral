import { Routes } from '@angular/router';
import { ResourceComponent } from './resources/resource-list/resource-list.component';
import { HomeComponent } from './home/home.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'sinformer', component: ResourceComponent },
  { path: 'reduire', component: ResourceComponent },
  { path: 'reutiliser', component: ResourceComponent },
  { path: 'substituer', component: ResourceComponent },
  { path: 'admin', component: ResourceEditComponent },
  { path: 'admin/resources/:id', component: ResourceEditComponent },
];
