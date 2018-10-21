import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { Globals } from './globals';
import { MasterPageComponent } from './master-page/master-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    Globals,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
