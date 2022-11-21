import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurants } from '../restaurant';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  value:string;
  data:any;

  searchValue() {
    if(this.value!=null) {
      this.snackBar.open('Register or Login First...', 'Ok', {
        duration: 1000
      });
    }
  }

  // To Fetch all the restaurants
  fetchRestaurants() {
    this.apiService.getAllApprovedRestaurants().subscribe((response:any)=>{
      this.data = response;
    })
  }

}
