import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private route:Router) { }

  setToken(token:any){
    localStorage.setItem("token",token)
    return true
  }

  getToken(){
    return localStorage.getItem("token")
  }

  setEmailId(emailId:any) {
    localStorage.setItem("emailId",emailId);
    return true;
  }

  getEmailId() {
    return localStorage.getItem("emailId");
  }

  setRestaurantId(emailId:any) {
    localStorage.setItem("restId",emailId);
    return true;
  }

  getRestaurantId() {
    return localStorage.getItem("restId");
  }

  setItemsInCart(cart:any) {
    localStorage.setItem("cart",cart);
  }

  getItemsInCart() {
    return localStorage.getItem("cart");
  }

 //log out Login user
 logOut(){
   localStorage.removeItem("token")
   this.route.navigate(['landing'])
 }

 //check user login or not
 isLoggedIn(){
   let token = localStorage.getItem("token");
   if(token === undefined || token === '' || token === null){
     return false;
   }else{
     return true;
   }
 }

 // Storing Registered Restaurant Object for approval purpose...
 
//  setRegisteredRestaurantId(id:any) {
//   localStorage.setItem("id",id);
//   return true;
//  }

//  getRegisteredRestaurantId(){
//   return localStorage.getItem("id");
//  }

//  removeRegisteredRestaurantId() {
//   localStorage.removeItem("id");
//  }

  // Storing customerName so i can use it in cuisines component.
  setCustomerName(customerName:any) {
    localStorage.setItem("customerName",customerName);
    return true;
  }

  getCustomerName() {
    return localStorage.getItem("customerName");
  }

  setFavRestaurantsValue(favRestaurantsValue:any) {
    localStorage.setItem("favRestaurantsValue",favRestaurantsValue);
    return true;
  }

  getFavRestaurantsValue() {
    return localStorage.getItem("favRestaurantsValue");
  }

}
