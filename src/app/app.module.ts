import {
  BrowserModule,
  provideClientHydration,
}from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HeroesComponent } from './heroes/heroes.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ResourceListComponent } from './resources/resource-list/resource-list.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';
import { ResourceData } from './resources/shared/api/resource.data';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    ResourceListComponent,
    ResourceEditComponent,
    HeroesComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [provideClientHydration(), provideRouter(routes), ResourceData],
  bootstrap: [AppComponent],
})
export class AppModule {}
