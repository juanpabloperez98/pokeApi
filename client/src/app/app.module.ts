import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Approutes } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    HomeModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(Approutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
