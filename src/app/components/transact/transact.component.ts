import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {

  form!:FormGroup

  phone_number:any

  server_errors:boolean

  success:any

  success_submit:boolean=false

  submitted:boolean=false;

  loading:boolean = false

  user:any = ''

  categories:any


  constructor(
              private router:Router, 
              private route:ActivatedRoute,
              private toastr:ToastrService,
              private http:HttpClient,
              private authService:AuthenticationService,
              private transactService:TransactionService,
              private profileService:ProfileService
              ) { }


  ngOnInit(): void {
            this.form = new FormGroup({
              'recipient_name':new FormControl(null, [Validators.required]),
              'recipient_account':new FormControl(null, [Validators.required]),
              'amount':new FormControl(null, [Validators.required]),
              'category':new FormControl(null, [Validators.required]),
            
            });


            //get user instance
            this.profileService.getCurrentUser()
                .subscribe(
                     res => {
                           this.user=res
                     }
                )

            //get categories
            this.transactService
                .getCategories()
                .subscribe(
                  response =>{
                    this.categories = response
                    console.log(response)
                  },
                  error=>{
                    console.log(error)
                  }
                )
 
  }


  submit(){
    this.submitted=true  //form submitted

    this.loading=true    //form loadng
    
        if(this.form.valid){
                  // return
                  this.http
                        .post(`${environment.apiUrl}/api/maketransaction/${this.user.phone_number}/`,this.form.getRawValue())  
                        .subscribe( 
                            response =>{  

                                this.loading=false

                                this.toastr.success('Your transaction was successful.', 'Transaction successful')
   
                                this.form.reset()


                                this.submitted=false

                                this.success_submit=true

                                this.router.navigateByUrl('/my-account')
                              },
                              
                              error => 
                              {
                                console.log(error);
                                
                                // this.server_errors= true
                              
                                this.loading=false
                                
                                this.toastr.warning(error.error, 'Transaction unsuccessful!')
                              }
                            
                        )
        }else{
              this.loading=false

              this.toastr.error('Invalid form, please provide all the required details.', 'Uploading unsuccessful')
        }
  }

  

}
