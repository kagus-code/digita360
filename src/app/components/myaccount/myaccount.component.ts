import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { TransactionService } from 'src/app/services/transaction.service';

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

  transactions:any=''


  showTransactions = true
  showInsights = false


  constructor(
                private current_user:ProfileService, 
                private http:HttpClient, 
                private toastr:ToastrService,
                private transactService:TransactionService
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

                    //fetch transactions
                       this.transactService
                           .getTransactions(this.user.phone_number)
                           .subscribe( 
                                      res=>{ 
                                             this.transactions=res
                                             console.log(res);
                                             
                                             }, 
                                      error=>{
                                              console.log(error);
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




  }



  submit(){

    if(this.form.valid){
      this.http.patch(`${environment.apiUrl}/api/deposit/${this.user.phone_number}/`,this.form.getRawValue())

            .subscribe(
              res => {
                this.toastr.success('Successful deposit.')

                location.reload()
              },
              error=>{
                this.toastr.error(error.error,'Unsuccessful deposit.')
              }
            )
    }else{

              this.toastr.error('Please enter the amount you want to deposit', 'Unsuccessful Deposit')
    }
       


  }


  toggleComponents(){
    this.showInsights = !this.showInsights
    this.showTransactions = !this.showTransactions
  }

}
