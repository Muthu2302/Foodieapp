import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { CustDashboardComponent } from './cust-dashboard/cust-dashboard.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CartComponent } from './cart/cart.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { RegRestaurantComponent } from './reg-restaurant/reg-restaurant.component';
import { RestDashboardComponent } from './rest-dashboard/rest-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ApproveRestaurantComponent } from './approve-restaurant/approve-restaurant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    CustDashboardComponent,
    FavouritesComponent,
    CartComponent,
    CuisinesComponent,
    RegRestaurantComponent,
    RestDashboardComponent,
    AdminDashboardComponent,
    ApproveRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
