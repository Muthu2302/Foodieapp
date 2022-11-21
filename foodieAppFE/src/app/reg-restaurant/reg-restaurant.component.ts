import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-reg-restaurant',
  templateUrl: './reg-restaurant.component.html',
  styleUrls: ['./reg-restaurant.component.css']
})
export class RegRestaurantComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private route:Router, private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    'emailId':new FormControl('',[Validators.required, Validators.email]),
    'userRole':new FormControl('RESTAURANT',[Validators.required]),
    'restaurantName':new FormControl('',[Validators.required]),
    'imageUrl':new FormControl('',[Validators.required]),
    'phoneNo':new FormControl('',[Validators.required]),
    'city':new FormControl('',[Validators.required]),
    'password':new FormControl('',[Validators.required])
  })

  registerRestaurant() {
    console.log("Inside the registerRestaurant method");
    console.log(this.registerForm.value);
    if(this.registerForm.valid) {
       this.apiService.registerRestaurant(this.registerForm.value).subscribe((response:any)=>{
        console.log("Restaurant Registerd");
        // this.loginService.setRegisteredRestaurantId(response.emailId);
        console.log(response.emailId);
        this.snackBar.open('Login after 5 - 10 minutes, ThankYou', 'Ok', {
          duration: 1000
        });
        this.route.navigate(['landing'])
      })
    }else{
      console.log("Enter Correct details");
      this.snackBar.open('Enter Correct details', 'Ok', {
        duration: 1000
      });
    }
  }
}
