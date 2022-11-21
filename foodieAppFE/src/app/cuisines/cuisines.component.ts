import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent implements OnInit {

  constructor(private login:LoginService, private apiService:ApiServiceService, private snackBar:MatSnackBar) {
    this.userEmailId = this.login.getEmailId();
    this.emailId = this.login.getRestaurantId();
    this.userName = this.login.getCustomerName();
    console.log("RestaurantId : "+this.emailId);
    this.cart = JSON.parse(this.login.getItemsInCart()!);
    console.log(this.cart);
  }

  // this is used to store the search value
  value:any;
  // userName of current loggen in User
  userName:any;
  // emailId Of current logged in user 
  userEmailId:any;
  // emailId of Restaurant
  emailId:any;
  // To Store the filtered data.
  filter:any = [];
  // Storing all the cuisines of selected restaurant
  cuisine:any = [];
  cart = 0;

  // cuisines to store all the filtered cuisines.
  cuisines:string[] = [];


  ngOnInit(): void {
    this.getAllCuisines();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );    
  }

  // For Searching/filtering purpose
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.cuisines.filter(option => 
    option.toLowerCase().includes(filterValue));
  }

  searchValue() {
    console.log("Cuisine : "+this.value);
    console.log(this.cuisine);
    this.cuisine.forEach((element:any) => {
      if(element.cuisineName === this.value){
        this.filter.push(element);
        console.log(this.filter);
        this.cuisine = this.filter;
      }
      else
      {
        this.snackBar.open('Cuisines are not present with given value', 'Ok', {
          duration: 1500
        });
      }
    });
  }

  refresh() {
    this.value='';
    location.reload();
  }

  getAllCuisines() {
    this.apiService.getcuisines(this.emailId).subscribe((response:any)=>{
      this.cuisine = response.cuisines;
      // To fetch the cuisine & stored it inside cuisine array.
      this.cuisine.forEach((res:any) => {
        console.log(res.cuisineName);
        this.cuisines.push(res.cuisineName);
      })
      console.log("cuisines Array length : "+this.cuisines.length);
    })
  }

  addToCart(data:any) {
    this.apiService.addToCart(data, this.userEmailId).subscribe((response:any)=>{
      this.snackBar.open('Successfully Added to Cart', 'Ok', {
        duration: 1000
      });
      this.cart += 1;
    })
  }
}
