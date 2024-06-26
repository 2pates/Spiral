import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ResourceListComponent } from './resources/resource-list/resource-list.component';
import { ResourceEditComponent } from './resources/resource-edit/resource-edit.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdjustFontSizeDirective } from './shared/adjust-font-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResourceListComponent,
    ResourceEditComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AdjustFontSizeDirective,
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
  providers: [provideClientHydration(), provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
