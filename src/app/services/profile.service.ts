import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }


  getCurrentUser(){
    return this.http
               .get('https://kagusdigital360.herokuapp.com/api/user/current-user/',{withCredentials:true})
  }

  createAccount(form, phone_number){
      return this.http
                .post(`https://kagusdigital360.herokuapp.com/api/create-new-account/${phone_number}/`,form)
  }

  getAccountDetails(phone_number){
    return this.http
               .get(`https://kagusdigital360.herokuapp.com/api/get-account-details/${phone_number}/`)
  }
}
