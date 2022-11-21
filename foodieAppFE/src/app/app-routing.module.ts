import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ApproveRestaurantComponent } from './approve-restaurant/approve-restaurant.component';
import { CartComponent } from './cart/cart.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { CustDashboardComponent } from './cust-dashboard/cust-dashboard.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegRestaurantComponent } from './reg-restaurant/reg-restaurant.component';
import { RegisterComponent } from './register/register.component';
import { RestDashboardComponent } from './rest-dashboard/rest-dashboard.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'landing', component:LandingComponent},
  {path:'custdash', component:CustDashboardComponent},
  {path:'favourites', component:FavouritesComponent},
  {path:'cart', component:CartComponent},
  {path:'cuisines', component:CuisinesComponent},
  {path:'regrestaurant', component:RegRestaurantComponent},
  {path:'restdash', component:RestDashboardComponent},
  {path:'admin', component:AdminDashboardComponent},
  {path:'approve', component:ApproveRestaurantComponent},
  {path:'', component:LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
