import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css']
})
export class CustDashboardComponent implements OnInit {

  constructor(private loginService:LoginService, private apiService:ApiServiceService, private route:Router, private snackBar:MatSnackBar) {
    this.fetchRestaurants();
    this.emailId = this.loginService.getEmailId();
    console.log("EmailId : "+this.emailId);
    this.getCustomerByEmailId();
    this.favRestaurantsValue = JSON.parse(this.loginService.getFavRestaurantsValue()!);
    console.log(this.favRestaurantsValue);
    this.getCuisinesFromCart();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  // this is used to store the search value
  value:any;

  // It is storing the data of all the restaurants.
  data:any = [];

  // To store the current loggedIn user emailId
  emailId:any;

  // To store the current customerName user emailId
  customerName:any;

  // To Store the filtered data.
  filter:any = [];

  // To Store the number of favourite restaourants.
  favRestaurantsValue = 0;

  // city to store all the filtered restaurant cities.
  city:string[] = [];

  // for displaying items stored inside cart.
  cart = 0;

  // Storing all the cuisines available in cart
  cuisine:any = [];

  // For Searching/filtering purpose
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.city.filter(option => 
    option.toLowerCase().includes(filterValue));
  }

  searchValue() {
    console.log("city : "+this.value);
    this.data.forEach((element:any) => {
      if(element.city === this.value){
        this.filter.push(element);
        console.log(this.filter);
        this.data = this.filter;
      }
      else
      {
        this.snackBar.open('Restaurants based on the given city is not present', 'Ok', {
          duration: 1500
        });
      }
    });
  }

  // For Logout
  logout() {
    this.loginService.logOut();
  }

  // To Fetch all the restaurants
  fetchRestaurants() {
    this.apiService.getAllApprovedRestaurants().subscribe((response:any)=>{
      this.data = response;
      // To fetch the restaurant cities & stored it inside city array.
      this.data.forEach((res:any)=>{
        this.city.push(res.city);
      })
      console.log("city Array length : "+this.city.length);
    })
  }

  refresh() {
    this.value='';
    location.reload();
  }

  //For Adding the restaurant as favourite
  AddToFavourite(data:any) {
    console.log("EmailId : "+this.emailId);
    this.apiService.addFavouriteRestaurant(data,this.emailId).subscribe({
      next:(response:any)=>{
        console.log(response);
        console.log("Restaurant added to favourite");
        this.favRestaurantsValue += 1;
        this.snackBar.open('Restaurant added to favourite', 'Ok', {
          duration: 1000
        });
      },
      error: (err:any) => {
        this.snackBar.open('Restaurant already added as favourite', 'Ok', {
          duration: 2000
        });
      }
    })
  }

  //For Fetching the User/Customer object  
  getCustomerByEmailId() {
    this.apiService.getCustomerByEmailId(this.emailId).subscribe((response:any)=>{
      this.customerName = response.userName;
      this.loginService.setCustomerName(response.userName);
      console.log("customerName : "+this.customerName);
    })
  }

  showCuisines(data:any) {
    console.log("Restaurant EmailId : "+data.emailId);
    this.loginService.setRestaurantId(data.emailId);
    this.route.navigate(["/cuisines"]);
  }

  getCuisinesFromCart() {
    this.apiService.getFromCart(this.emailId).subscribe((response:any)=>{
      this.cuisine = response;
      console.log("Cuisine array Length : "+this.cuisine.length);
      this.cart = this.cuisine.length;
      this.loginService.setItemsInCart(this.cuisine.length);
    })
  }

  deleteCuisinesFromCart(cuisineName:any) {
    this.apiService.deleteFromCart(this.emailId, cuisineName).subscribe((response:any)=>{
      this.cart -= 1;
      this.getCuisinesFromCart();
    })
  }

  order() {
    this.apiService.deleteAllCuisines(this.emailId).subscribe((response:any) => {
      this.snackBar.open('Order placed successfully', 'Ok', {
        duration: 2000
      });
      this.getCuisinesFromCart();
      let ref = document.getElementById('cancel');
      ref?.click();
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
