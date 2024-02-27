import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { 
	IgxIconModule,
	IgxNavbarModule,
	IgxDropDownModule,
	IgxToggleModule,
	IgxButtonModule
 } from "igniteui-angular";
import { ThemeComponent } from './theme/theme.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    FooterComponent,
    NavbarComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxIconModule,
    IgxNavbarModule,
    IgxToggleModule,
    IgxButtonModule,
    IgxDropDownModule
  ],
  providers: [
    provideClientHydration(),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
