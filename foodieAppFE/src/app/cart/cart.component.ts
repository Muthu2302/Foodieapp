import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/api-service.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private login:LoginService, private apiService:ApiServiceService, private snackBar:MatSnackBar) {
    this.userEmailId = this.login.getEmailId();
    this.userName = this.login.getCustomerName();
  }

  ngOnInit(): void {
    this.getCuisinesFromCart();
  }
  // Storing all the cuisines available in cart
  cuisine:any = [];
  // emailId Of current logged in user 
  userEmailId:any;
  // for total price
  price = 0;
  //quantity
  quantity = 1;
  // total
  total:any;
  //cuisineName for quantity < 0
  cuisineN:any;
  // userName of current loggen in User
  userName:any;
  //to store the items present inside cart.
  cart = 0;
  
  getCuisinesFromCart() {
    this.apiService.getFromCart(this.userEmailId).subscribe((response:any)=>{
      this.cuisine = response;
      console.log("Array Length : "+this.cuisine.length);
      this.login.setItemsInCart(this.cuisine.length);
      this.cart = this.cuisine.length;
      this.cuisine.forEach((element:any) => {
        this.price += element.price;
        this.total = this.price;
      });
    })
  }

  deleteCuisinesFromCart(cuisineName:any) {
    this.apiService.deleteFromCart(this.userEmailId, cuisineName).subscribe((response:any)=>{
      this.getCuisinesFromCart();
      location.reload();
    })
  }

  // increaseQuantity(data:any){
  //   this.total = 0;
  //   let cuisineName = data.cuisineName;
  //   if(cuisineName === data.cuisineName) {
  //     console.log(cuisineName);
  //     this.quantity += 1;
  //     this.total = this.price*this.quantity;
  //   }
  //   else{
  //     this.quantity = 1;
  //   }
  // }

  // decreaseQuantity(data:any){
  //   if(this.quantity <= 1) {
  //     this.snackBar.open('You cannot decrease quantity less than 1', 'Ok', {
  //       duration: 1000
  //     });
  //   }
  //   else{
  //     this.quantity -= 1;
  //     this.total -= this.price;
  //   }
  // }
}
