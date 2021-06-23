import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthenticationService } from 'src/app/services/admin-authentication.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

        form! : FormGroup ;
        
        submitted:boolean=false
        
        loading:boolean=false
        
        server_errors:any

        returnUrl:any
        
        constructor(
                private route: ActivatedRoute,
                private router: Router,
                private toastr:ToastrService,
                private adminAuthService:AdminAuthenticationService
        ) {
                 // redirect to home if already logged in
            if (this.adminAuthService.currentAdminValue) { 
              this.router.navigate(['/adminverify']);
       }
         }

        
        
        ngOnInit(): void {
          this.form = new FormGroup({
            'phone_number':new FormControl(null, [Validators.required]),
            'password':new FormControl(null, [Validators.required]),
          });

             // get return url from route parameters or default to '/adminlogin'
             this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/adminlogin';

        }
        
        submit(): void{
        
          this.submitted=true
        
          if(this.form.valid){
                  this.loading=true
        
                  this.adminAuthService
                      .login(this.form.getRawValue())
                      .subscribe(
                        response => {
                                this.toastr.success('Successful Login')
                                
                                this.router.navigate(['/adminverify']);
                        },
                        error =>{
                          this.loading=false

                          this.toastr.error(error.error.detail,'Login Unsuccessful!');
            
                          console.log('error', error)
                        }
                      );

          }else{
            this.toastr.error('Invalid form, please provide all the required details.','Login Unsuccessful!');
          }
        
        
        }


}
