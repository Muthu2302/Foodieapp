import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private route:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  // data : any;
  // confirmPassword:any;

  registerForm = new FormGroup({
    'emailId':new FormControl('',[Validators.required, Validators.email]),
    'userName':new FormControl('',[Validators.required]),
    'phoneNo':new FormControl('',[Validators.required]),
    'city':new FormControl('',[Validators.required]),
    'password':new FormControl('',[Validators.required])
    // 'userRole':new FormControl('',[Validators.required])
  })

  registerUser() {
    console.log("Inside the registerUser method");
    // this.data = this.registerForm.value;
    // && this.data.password == this.confirmPassword
    if(this.registerForm.valid) {
       this.apiService.registerUser(this.registerForm.value).subscribe((response:any)=>{
        this.snackBar.open('User Registerd', 'Ok', {
          duration: 1000
        });
        this.route.navigate(['login'])
      })
    }else{
      console.log("Enter Correct details");
      this.snackBar.open('Enter Correct details', 'Ok', {
        duration: 1000
      });
    }
  }

}
