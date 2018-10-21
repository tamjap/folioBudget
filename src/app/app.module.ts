import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { Utilities } from '../assets/JS/utilities';
import { MasterPageComponent } from './master-page/master-page.component';
import { MasterBudgetComponent } from './master-budget/master-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterPageComponent,
    MasterBudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    Utilities,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
