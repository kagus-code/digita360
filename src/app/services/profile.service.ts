import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }


  getCurrentUser(){
    return this.http
               .get('http://localhost:8000/api/user/current-user/',{withCredentials:true})
  }
}
