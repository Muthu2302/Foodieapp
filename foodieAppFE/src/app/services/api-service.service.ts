import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  login(data:any) {
    return this.http.post(`${baseurl}v2/login`,data);
  }

  registerUser(data:any) {
    return this.http.post(`${baseurl}v3/registercustomer`,data);
  }

  getAllRestaurants() {
    return this.http.get(`${baseurl}v4/getallrestaurants`);
  }

  addFavouriteRestaurant(data:any, emailId:any) {
    return this.http.post(`${baseurl}v3/customer/addfavrestuarant/${emailId}`,data);
  }

  getFavouriteRestaurants(emailId:any) {
    return this.http.get(`${baseurl}v3/customer/getfavrestaurant/${emailId}`);
  }

  getCustomerByEmailId(emailId:any) {
    return this.http.get(`${baseurl}v3/customer/${emailId}`);
  }

  deleteFavRestaurant(emailId:any, restaurantName:any) {
    return this.http.delete(`${baseurl}v3/customer/deletefavrestaurant/${emailId}/${restaurantName}`);
  }

  getcuisines(emailId:any) {
    console.log(emailId);
    return this.http.get(`${baseurl}v4/getcuisines/${emailId}`);
  }

  addToCart(cuisine:any, emailId:any) {
    return this.http.post(`${baseurl}v3/customer/addtocart/${emailId}`,cuisine);
  }

  getFromCart(emailId:any) {
    return this.http.get(`${baseurl}v3/customer/getfromcart/${emailId}`);
  }

  deleteFromCart(emailId:any, cuisineName:any) {
    return this.http.delete(`${baseurl}v3/customer/deletefromcart/${emailId}/${cuisineName}`);
  }

  registerRestaurant(restaurant:any) {
    return this.http.post(`${baseurl}v4/registerrestaurant`,restaurant);
  }

  // Ok

  approveRestaurant(emailId: any) {
    return this.http.post(`${baseurl}v1/admin/${emailId}/approverestaurant`,emailId);  
  }

  getrestaurants(){
    return this.http.get(`${baseurl}v1/admin/restaurants`);
  }

  getRestaurant(emailId:any){
    return this.http.get(`${baseurl}v4/restaurant/getrestaurant/${emailId}`);
  }

  deletecuisine(cuisinename:any, emailId:any){
    return this.http.delete(`${baseurl}v4/restaurant/deletecuisine/${cuisinename}/${emailId}`);
  }

  addcuisine(data:any, emailId:any){
    return this.http.post(`${baseurl}v4/restaurant/addcuisine/${emailId}`,data);
  }

  updatecuisine(data:any, emailId:any) {
    return this.http.put(`${baseurl}v4/restaurant/updatecuisine/${emailId}`,data);
  }

  deleteRestaurant(emailId:any) {
    return this.http.delete(`${baseurl}v4/restaurant/delete/${emailId}`);
  }

  // To remove the Admin data also.
  deleteAdminRestaurant(emailId:any) {
    return this.http.delete(`${baseurl}v1/admin/deleterestaurant/${emailId}`);
  }
  
  // To remove the User data.
  deleteUser(emailId:any) {
    return this.http.delete(`${baseurl}v2/deleteUser/${emailId}`);
  }

  // To delete all the cuisines from given user
  deleteAllCuisines(emailId:any) {
    return this.http.delete(`${baseurl}v3/customer/deleteallcuisines/${emailId}`);
  }

  getAllRestaurantsWhichAreNotApproved() {
    return this.http.get(`${baseurl}v4/getNotApprovedRestaurants`);
  }

  getAllApprovedRestaurants() {
    return this.http.get(`${baseurl}v4/getApprovedRestaurants`);
  }

  afterApprovedRestaurant(emailId:any) {
    return this.http.put(`${baseurl}v4/afterApprovedRestaurant/${emailId}`,emailId);
  }

  adminAfterApprovedRestaurant(emailId:any) {
    return this.http.put(`${baseurl}v1/adminAfterApprovedRestaurant/${emailId}`, emailId);
  }

}
