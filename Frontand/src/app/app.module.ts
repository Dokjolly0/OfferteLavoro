import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Assicurati di importare FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { JobService } from './services/offerte-lavoro.service.service';
import { AddRequestComponent } from './components/add-request/add-request.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AddRequestComponent],
  imports: [
    BrowserModule,
    FormsModule, // Aggiungi FormsModule qui
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [JobService],
  bootstrap: [AppComponent],
})
export class AppModule {}
