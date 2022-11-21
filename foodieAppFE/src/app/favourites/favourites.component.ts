import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private loginService:LoginService, private snackBar:MatSnackBar) 
  { 
    this.emailId = this.loginService.getEmailId();
    this.customerName = this.loginService.getCustomerName();
  }

  ngOnInit(): void {
    console.log("EmailId : "+this.emailId);
    this.fetchFavRestaurants();
  }

  // It is storing the data of all the favourite restaurants.
  data:any;

  // To store the current loggedIn user emailId
  emailId:any;

  // To Store the number of favourite restaourants.
  favRestaurantsValue = 0;

  // To Store the name of current loggedIn User.
  customerName:any;

  fetchFavRestaurants() {
    this.apiService.getFavouriteRestaurants(this.emailId).subscribe((response:any)=>{
      this.data = response;
      this.favRestaurantsValue = this.data.length;
      this.loginService.setFavRestaurantsValue(this.data.length);
      console.log(this.favRestaurantsValue);
    })
  }

  deleteRestaurant(restaurantName:any) {
    this.apiService.deleteFavRestaurant(this.emailId,restaurantName).subscribe((response:any)=>{
      console.log("Restaurant Successfully deleted");
      this.fetchFavRestaurants();
    })
  }

}

/*
  error: (err:any) => {
    this.snackBar.open('Restaurant already marked as favourite', 'Ok', {
      duration: 2000
    });
  }
*/
