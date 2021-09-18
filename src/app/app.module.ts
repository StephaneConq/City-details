import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {GoogleMapsModule} from "@angular/google-maps";
import { WelcomeComponent } from './components/dialogs/welcome/welcome.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SearchbarComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
