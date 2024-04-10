import { Routes } from '@angular/router';
import { ResourceListComponent } from './resources/resource-list/resource-list.component';
import { HomeComponent } from './home/home.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'sinformer', component: ResourceListComponent },
  { path: 'reduire', component: ResourceListComponent },
  { path: 'reutiliser', component: ResourceListComponent },
  { path: 'substituer', component: ResourceListComponent },
  // { path: 'resources/:id', component: ResourceEditComponent }, //Faire un resource-detail
  {
    path: 'resources/:id/edit',
    component: ResourceEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resources/create',
    component: ResourceEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];
