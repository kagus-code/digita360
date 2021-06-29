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
               .get('http://localhost:8000/api/user/current-user/',{withCredentials:true})
  }

  createAccount(form, phone_number){
      return this.http
                .post(`http://localhost:8000/api/create-new-account/${phone_number}/`,form)
  }

  getAccountDetails(phone_number){
    return this.http
               .get(`http://localhost:8000/api/get-account-details/${phone_number}/`)
  }
}
