import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
        
        constructor(
                private http: HttpClient,
                private router: Router,
                private toastr:ToastrService
        ) { }
        
        
        ngOnInit(): void {
          this.form = new FormGroup({
            'phone_number':new FormControl(null, [Validators.required]),
            'password':new FormControl(null, [Validators.required]),
          });
        }
        
        submit(): void{
        
          this.submitted=true
        
          if(this.form.valid){
                  this.loading=true
        
                  this.http.post('http://localhost:8000/api/user/login/',this.form.getRawValue(),
                  {withCredentials:true})
                  .subscribe(
                    response => {
                            this.toastr.success('Successful Login')
                            
                            this.router.navigateByUrl('adminverify');
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
