import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if not imported already
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourcesData } from './shared/database/resources.data';
import { ResourceComponent } from './resource/resource.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ResourceComponent,
    ResourceEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule, // Import HttpClientModule if not imported already
    HttpClientInMemoryWebApiModule.forRoot(ResourcesData), // Use HttpClientInMemoryWebApiModule.forRoot with ResourcesData
  ],
  providers: [provideClientHydration(), provideRouter(routes), ResourcesData],
  bootstrap: [AppComponent],
})
export class AppModule {}
