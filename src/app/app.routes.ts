import { Routes } from '@angular/router';
import { ResourceListComponent } from './resources/resource-list/resource-list.component';
import { HomeComponent } from './home/home.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'sinformer', component: ResourceListComponent },
  { path: 'reduire', component: ResourceListComponent },
  { path: 'reutiliser', component: ResourceListComponent },
  { path: 'substituer', component: ResourceListComponent },
  { path: 'admin', component: ResourceListComponent },
  //{ path: 'admin/resources/:id', component: ResourceEditComponent }, Faire un resource-detail
  { path: 'admin/resources/:id/edit', component: ResourceEditComponent },
  { path: 'admin/resources/create', component: ResourceEditComponent },
];
