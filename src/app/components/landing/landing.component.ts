import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
​
  user:any = []
  message =" "
​
  name='csrftoken'

  account:any = ''
  constructor(private http:HttpClient, 
              private current_user:ProfileService,
              
              ) { }

  ngOnInit(): void {
            //fetches current user
            this.current_user
                .getCurrentUser()
                .subscribe(response =>{
                    console.log('Lorem ipsum');
                    
                    console.log(response);
                    this.user = response;


                    //fetch accounts details
                    this.current_user
                    .getAccountDetails(this.user.phone_number)
                    .subscribe(
                      response => {
                          this.account = response
                          console.log(response)
                      },
                      error=>{
                            console.log(error)
                      }
                    )
                },
                error => {
                  console.log('error', error)
                  this.message ="no user found";

              }
            );


        
  }
​
}