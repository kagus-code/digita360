import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

      private currentUserSubject: BehaviorSubject<any>;
      public currentUser: Observable<any>;

      constructor(private http: HttpClient) {
          this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
          this.currentUser = this.currentUserSubject.asObservable();
      }


      public get currentUserValue(){
          return this.currentUserSubject.value;
      }


    //   user login
      login(credentials) {
          return this.http
                 .post<any>('http://localhost:8000/api/user/login/', credentials)
                 .pipe(map(user => {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  return user;
              }));
      }

    //user logout
    logout() {
    
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        return this.http
                    .post(
                          'http://localhost:8000/logout/',
                            {},
                            {withCredentials:true}
                        )
      }


      //admin login
      adminlogin(credentials) {
        return this.http
               .post<any>('http://localhost:8000/api/admin/login/', credentials)
               .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }



}
