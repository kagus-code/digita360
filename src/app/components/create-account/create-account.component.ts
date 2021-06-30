import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  form! : FormGroup ;

  submitted:boolean=false
  loading:boolean=false
  server_errors:any

  user:any =[]
  message:any
  
  constructor(
          private router: Router,
          private toastr:ToastrService,
          private profileService:ProfileService,
          private route:ActivatedRoute,
          private current_user: ProfileService
  ) {}


  ngOnInit(): void {
        this.form = new FormGroup({
          'account_name': new FormControl(null, [Validators.required, Validators.maxLength(15)], 
),
        });


        this.current_user
        .getCurrentUser()
        .subscribe(response =>{
            
            console.log(response);
            this.user= response;
        },
        error => {
          console.log('error', error)
          this.message ="no user found";

      }
    );
  }

  
  submit(): void{
    this.submitted=true
    
    if(this.form.valid){
            this.loading=true
            this.profileService.createAccount(this.form.getRawValue(), this.user.phone_number)
            .subscribe(
              response => {
                      //  console.log(response)
                      this.toastr.success('Account name added successfully')

                      //navigate home

                      this.router.navigateByUrl('/')
                      
              },
              error =>{
                      this.loading=false
                      // this.server_errors=error.error
                      this.toastr.error(error.error.detail,'Unsuccessful, account name was not added!');
                       console.log('error', error)
              }
            );
    }else{
      this.toastr.error('Invalid form, please provide all the required details.','Login Unsuccessful!');
    }
  }
}
