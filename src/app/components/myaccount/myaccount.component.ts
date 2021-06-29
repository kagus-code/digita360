import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  form!:FormGroup

  user:any = ''
  message =" "

  name='csrftoken'

  account:any = ''


  constructor(private current_user:ProfileService, private http:HttpClient, private toastr:ToastrService) { }

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

            //form init
            this.form = new FormGroup({
              'account_balance':new FormControl(null, [Validators.required])
            
            })

            //current user
            //get user instance
            // this.current_user.getCurrentUser()
            //     .subscribe(
            //          res => {
            //                this.user=res
            //          }
            //     )


  }



  submit(){
       this.http.patch(`${environment.apiUrl}/api/deposit/${this.user.phone_number}/`,this.form.getRawValue())
            .subscribe(
              res => {
                this.toastr.success('Successful deposit.')

                location.reload()
              },
              error=>{
                this.toastr.success(error.error,'Unsuccessful deposit.')
              }
            )

  }

}
