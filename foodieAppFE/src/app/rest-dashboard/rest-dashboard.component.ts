import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-rest-dashboard',
  templateUrl: './rest-dashboard.component.html',
  styleUrls: ['./rest-dashboard.component.css']
})
export class RestDashboardComponent implements OnInit {

  constructor(private loginService:LoginService, private apiService:ApiServiceService, private snackBar:MatSnackBar) {
    this.emailId = this.loginService.getEmailId();
    this.fetchRestaurant();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );    
  }

  // For Logout
  logout() {
    this.loginService.logOut();
  }

  // this is used to store the search value
  value:any;

  // It is storing the data of all the cuisines.
  data:any;

  // To store the current loggedIn user emailId
  emailId:any;

  // To store the restaurant Name
  restaurantName:any;

  // To Store the filtered data.
  filter:any = [];

  // showAdd, showUpdate variable are just to hide one button, for ex. if we are performing addCuisine
  // so it should disable update button from modal.
  showAdd:boolean;
  showUpdate:boolean;

  // cuisines to store all the filtered cuisines.
  cuisines:string[] = [];

  // For Searching/filtering purpose
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.cuisines.filter(option => 
    option.toLowerCase().includes(filterValue));
  }

  cuisineForm = new FormGroup({
    'cuisineName':new FormControl('',[Validators.required]),
    'decription':new FormControl('',[Validators.required]),
    'price':new FormControl('',[Validators.required]),
    'rating':new FormControl('',[Validators.required]),
    'image':new FormControl('',[Validators.required])
  })

  searchValue() {
    console.log("Cuisine : "+this.value);
    console.log(this.data);
    this.data.forEach((element:any) => {
      if(element.cuisineName === this.value){
        this.filter.push(element);
        console.log(this.filter);
        this.data = this.filter;
      }
      else
      {
        this.snackBar.open('Cuisines are not present with given value', 'Ok', {
          duration: 1500
        });
      }
    });
  }

  // Method to fetch all the cuisines.
  fetchRestaurant() {
    this.apiService.getRestaurant(this.emailId).subscribe((response:any)=>{
      this.restaurantName = response.restaurantName;
      this.data = response.cuisines;
      // To fetch the cuisine & stored it inside cuisine array.
      this.data.forEach((res:any) => {
        console.log(res.cuisineName);
        this.cuisines.push(res.cuisineName);
      })
      console.log("cuisines Array length : "+this.cuisines.length);
    })
  }

  refresh() {
    this.value='';
    location.reload();
  }

  deletecuisine(cuisinename:any) {
    this.apiService.deletecuisine(cuisinename, this.emailId).subscribe((response:any)=>{
      this.fetchRestaurant();
    })
  }

  addcuisine() {
    this.apiService.addcuisine(this.cuisineForm.value,this.emailId).subscribe((response:any)=>{
      console.log("Cuisine Successfully Added");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.cuisineForm.reset();
      this.fetchRestaurant();
    });
  }

  onEdit(data:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.cuisineForm.controls['cuisineName'].setValue(data.cuisineName);
    this.cuisineForm.controls['decription'].setValue(data.decription);
    this.cuisineForm.controls['price'].setValue(data.price);
    this.cuisineForm.controls['rating'].setValue(data.rating);
    this.cuisineForm.controls['image'].setValue(data.image);
  }

  updateCuisine() {
    this.apiService.updatecuisine(this.cuisineForm.value, this.emailId).subscribe((response:any)=>{
      this.snackBar.open('Updated Successfully', 'Ok', {
        duration: 500
      });
      let ref = document.getElementById('cancel');
      ref?.click();
      this.cuisineForm.reset();
      this.fetchRestaurant();
    })
  }

  clickAddCuisine() {
    this.cuisineForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

}
