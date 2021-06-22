import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { ProfileService } from 'src/app/services/profile.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-verificationdetails',
  templateUrl: './admin-verificationdetails.component.html',
  styleUrls: ['./admin-verificationdetails.component.css']
})
export class AdminVerificationdetailsComponent implements OnInit {

  phone_number:any

  details:any

  loading:boolean = true

  image1:string = 'assets/Untitled design.png'

  constructor(
                  private route:ActivatedRoute, 
                  private userService:UserService,
                  private current_user:ProfileService
            ) { }

  ngOnInit(): void {
        //fetch current user
        this.current_user
            .getCurrentUser()
            .subscribe(response =>{
                  console.log(response);
                  // this.user = response;

                  Emitters.authEmitter.emit(true)
            },
        error => {
                        console.log('error', error)
                 }
        );
        //fetch doc

        this.route.params.subscribe(
              params=>{
                     this.userService
                          .getUserDocuments(params.phone_number)
                          .subscribe(
                                res => {
                                          this.details=res
                                          console.log(res);

                                          this.loading=false
                                          
                                       },
                                error=>{
                                    console.log(error);

                                    this.loading=false
                                }

                                
                     )
              }

        )
  }

}
