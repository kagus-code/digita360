import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }


  getCategories(){
          return this.http.get(`${environment.apiUrl}/api/get/categories/`)
  }


  getTransactions(phone_number){
         return this.http.get(`${environment.apiUrl}/api/get/user-transactions/${phone_number}`)
  }

}
