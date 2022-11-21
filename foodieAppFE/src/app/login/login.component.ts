import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private loginService:LoginService, private route:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  loginForm: FormGroup;

  initForm() {
    this.loginForm = new FormGroup({
      'emailId':new FormControl('',[Validators.required, Validators.email]),
      'password':new FormControl('',[Validators.required])
    })
  }

  loginProcess() {

  if(this.loginForm.valid) 
  {
    this.apiService.login(this.loginForm.value).subscribe({
      next: (response:any) => 
      {
        if(response.userRole === "USER") {
          this.loginService.setToken(response.token);
          this.loginService.setEmailId(response.emailId);
          console.log("User Login Successfully");
          this.route.navigate(['custdash']);
        } 
        else if(response.userRole === "RESTAURANT") 
        {
          this.loginService.setToken(response.token);
          this.loginService.setEmailId(response.emailId);
          console.log("Restaurant Login Success");
          this.route.navigate(['restdash']);
        } 
        else 
        {
          this.loginService.setToken(response.token);
          this.loginService.setEmailId(response.emailId);
          console.log("Admin Login Success");
          this.route.navigate(['admin']);
        } 
    },
    error: (err: any) => {
      console.log("Enter Correct EmailId and Password");
      this.snackBar.open('Enter Correct EmailId and Password', 'Ok', {
        duration: 1000
      });
    }
    });
  }
  else
  {
    console.log("Enter Correct EmailId and Password");
    this.snackBar.open('Enter Correct EmailId and Password', 'Ok', {
      duration: 1000
    });
  }
}

}


  //   if(this.loginForm.valid) 
  //   {
  //     this.apiService.login(this.loginForm.value).subscribe((response:any)=>{
  //       if(response.userRole === "USER") {
  //         this.loginService.setToken(response.token);
  //         this.loginService.setEmailId(response.emailId);
  //         console.log("User Login Successfully");
  //         this.route.navigate(['custdash']);
  //       } 
  //       else if(response.userRole === "RESTAURANT") 
  //       {
  //         this.loginService.setToken(response.token);
  //         this.loginService.setEmailId(response.emailId);
  //         console.log("Restaurant Login Success");
  //         this.route.navigate(['restdash']);
  //       } 
  //       else 
  //       {
  //         this.loginService.setToken(response.token);
  //         this.loginService.setEmailId(response.emailId);
  //         console.log("Admin Login Success");
  //         this.route.navigate(['admin']);
  //       }
  //     })
  //   }
  //   else
  //   {
  //     console.log("Enter Correct EmailId and Password");
  //     this.snackBar.open('Enter Correct EmailId and Password', 'Ok', {
  //       duration: 1000
  //     });
  //   }
  // }