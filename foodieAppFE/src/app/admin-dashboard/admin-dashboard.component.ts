import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private loginService:LoginService, private apiService:ApiServiceService, private route:Router, private snackBar:MatSnackBar) {
    this.fetchRestaurants();
    this.fetchRestaurantsForApprove();
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

  // To Store the filtered data.
  filter:any = [];

  // approve notification badge, this data is storing the registerdRestaurant object.
  approveNotification:number = 0;

  // city to store all the filtered restaurant cities.
  city:string[] = [];

  // For Searching/filtering purpose
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.city.filter(option => 
    option.toLowerCase().includes(filterValue));
  }


  fetchRestaurantsForApprove() {
    this.apiService.getAllRestaurantsWhichAreNotApproved().subscribe((response:any)=>{
      console.log("response.length : "+response.length);
      this.approveNotification = response.length;

    })
    console.log("Approve Notification : "+this.approveNotification);
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

  deleteRestaurant(emailId:any) {
    this.apiService.deleteRestaurant(emailId).subscribe((response:any)=>{
      // Calling this method here to remove the data from adminRestaurant database also
      this.deleteAdminRestaurant(emailId);
      // Calling this method here to remove the data from user database also
      this.deleteUser(emailId);
      console.log("Restaurant Deleted Succesfully");
      this.fetchRestaurants();
    })
  }

  deleteAdminRestaurant(emailId:any) {
    this.apiService.deleteAdminRestaurant(emailId).subscribe((response:any)=>{
      console.log("Admin Restaurant Deleted");
    })
  }

  deleteUser(emailId:any) {
    this.apiService.deleteUser(emailId).subscribe((response:any)=>{
      console.log("User Successfully deleted");
    })
  }

}
