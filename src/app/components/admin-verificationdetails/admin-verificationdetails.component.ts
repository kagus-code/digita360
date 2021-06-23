import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

            notifyloader:boolean = false

            approveloader:boolean = false

            declineloader:boolean = false
            


            image1:string = 'assets/Untitled design.png'

            constructor(
                              private route:ActivatedRoute, 
                              private userService:UserService,
                              private current_user:ProfileService,
                              private toastr:ToastrService,
                              private router:Router
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

                              this.phone_number=params.phone_number
                        }

                  )
            }


            activateDocuments(phone_number:any){
                  this.approveloader=true


                  this.userService
                      .approveDocuments(phone_number)
                      .subscribe( 
                                    res=>{
                                          this.toastr.success('User approved.')
                                          this.approveloader=false

                                          this.router.navigate(['/adminverify'])
                                    },
                                    error=>{
                                          console.log(error.error)
                                          this.approveloader=false

                                          this.toastr.error('Error approving documents.')
                                    }
                                )
            }

            notifyUploadDocuments(phone_number:any){
                  this.notifyloader=true


                  this.userService
                      .notifyUploadDocuments(phone_number)
                      .subscribe(
                        res=>{
                              this.toastr.success('Notification to upload sent.')
                              this.router.navigate(['/adminverify'])
                              this.notifyloader=false

                        },
                        error=>{
                              console.log(error.error)
                              this.toastr.error('Error notifying user.')
                              this.notifyloader=false

                        }
                      )
            }

            declineUploadDocuments(phone_number:any){
                  this.declineloader=true


                  this.userService
                      .declineDocs(phone_number)
                      .subscribe(
                        res=>{
                              this.toastr.success('Successful.Notification to reupload sent.')
                              this.declineloader=false

                              this.router.navigate(['/adminverify'])
                        },
                        error=>{
                              console.log(error.error)
                              this.declineloader=false

                              this.toastr.error('Error declining documents and notifying the user.')
                        }
                      )
            }





}
