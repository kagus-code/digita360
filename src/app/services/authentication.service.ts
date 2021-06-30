import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

      private currentUserSubject: BehaviorSubject<any>;
      public currentUser: Observable<any>;

      userObj: BehaviorSubject<any>=new BehaviorSubject<any>('')

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
                 .post<any>(`${environment.apiUrl}/api/user/login/`, credentials,{withCredentials:true})

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
                          `${environment.apiUrl}/logout/`,
                            {},
                            {withCredentials:true}
                        )
      }


      //admin login
    //   adminlogin(credentials) {
    //     return this.http
    //            .post<any>('https://kagusdigital360.herokuapp.com/api/admin/login/', credentials)
    //            .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }



}
