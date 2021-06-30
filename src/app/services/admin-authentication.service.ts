import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {

            private currentAdminSubject: BehaviorSubject<any>;
            public currentAdmin: Observable<any>;

            constructor(private http: HttpClient) {
                this.currentAdminSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentAdmin')));
                this.currentAdmin = this.currentAdminSubject.asObservable();
            }


            public get currentAdminValue(){
                return this.currentAdminSubject.value;
            }


          //   admin login
            login(credentials) {
                return this.http
                      .post<any>('https://kagusdigital360.herokuapp.com/api/admin/login/', credentials,{withCredentials:true})
                      .pipe(map(user => {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentAdmin', JSON.stringify(user));
                        this.currentAdminSubject.next(user);
                        return user;
                    }));
            }

          //admin logout
          logout() {

              // remove user from local storage to log user out
              localStorage.removeItem('currentAdmin');
              this.currentAdminSubject.next(null);

              return this.http
                          .post(
                                'https://kagusdigital360.herokuapp.com/logout/',
                                  {},
                                  {withCredentials:true}
                              )
            }


}
