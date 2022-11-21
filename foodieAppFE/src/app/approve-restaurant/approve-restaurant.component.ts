import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-approve-restaurant',
  templateUrl: './approve-restaurant.component.html',
  styleUrls: ['./approve-restaurant.component.css']
})
export class ApproveRestaurantComponent implements OnInit {

  constructor(private loginService:LoginService, private apiService:ApiServiceService, private snackBar:MatSnackBar) {
    this.fetchApproveRestaurant();
  }

  ngOnInit(): void {
  }

  // This data is storing the registerdRestaurant object.
  restaurantId:any = [];

  fetchApproveRestaurant() {
    this.apiService.getAllRestaurantsWhichAreNotApproved().subscribe((response:any)=>{
      response.forEach((res:any) => {
        this.restaurantId.push(res.emailId);
      });
    })
    console.log(this.restaurantId);
  }

  approveRestaurant(emailId:any) {
    this.apiService.approveRestaurant(emailId).subscribe({
      next: (result: any) => {
        console.log("Restaurant Approved");
      },
      error: (err: any) => {
        this.afterApprovedRestaurant(emailId);
        this.adminAfterApprovedRestaurant(emailId);
        this.snackBar.open('Restaurant Approved', 'Ok', {
          duration: 1000
        });
        location.reload();
      }
    });
  }

  rejectRestaurant(emailId:any) {
    this.apiService.deleteRestaurant(emailId).subscribe((response:any)=>{
      console.log("Restaurant Rejected");
      this.rejectAdminRestaurant(emailId);
      this.snackBar.open('Restaurant Rejected', 'Ok', {
        duration: 1000
      });
      location.reload();
    })
  }

  rejectAdminRestaurant(emailId:any) {
    this.apiService.deleteAdminRestaurant(emailId).subscribe((response:any)=>{
      console.log("Admin Restaurant Rejected");
    })
  }

  afterApprovedRestaurant(emailId:any) {
    this.apiService.afterApprovedRestaurant(emailId).subscribe((response:any)=>{
      console.log("Approved");
    })
  }

  adminAfterApprovedRestaurant(emailId:any) {
    this.apiService.adminAfterApprovedRestaurant(emailId).subscribe((response:any)=>{
      console.log("Admin Restaurant Approved");
    })
  }

}
