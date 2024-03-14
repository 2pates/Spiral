import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResourceComponent } from './resource/resource.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ResourceComponent,
    ResourceEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [provideClientHydration(), provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
