import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  form:FormGroup

  errors:any

  submitted:boolean=false;

  loading:boolean = false

  constructor(
        private http: HttpClient,
        private router: Router,
        private toastr:ToastrService
    ){ 
  }

  ngOnInit(): void {

    this.form =new FormGroup({
              first_name:new FormControl('', [Validators.required]),
              last_name:new FormControl('', [Validators.required]),
              username:new FormControl('', [Validators.required]),
              phone_number:new FormControl('', [Validators.required]),
              email:new FormControl('', [Validators.required]),
              password:new FormControl('', [Validators.required]),
     });
  }



  submit(): void{
    this.submitted=true


    if(this.form.valid){
      this.loading=true


      this.http.
                post('http://localhost:8000/api/admin/register/',this.form.getRawValue())
                .subscribe(
                     response =>{console.log(response)
                      
                      this.loading=false

                      this.toastr.success('You have been Successfully Registered. Login.', 'Registration successful')


                      this.router.navigate(['/adminlogin']);

                     }
                     ,
                     error => 
                     {
                          console.log(error.error)
                          this.errors= error.error
                          
                          this.loading=false

                          this.submitted=false

                          for(let [key, value] of Object.entries(this.errors)){
                            this.toastr.error(value[0], 'Registration unsuccessful') 
                          }
                     }
                  
                  )
    }else{
      this.toastr.error('Invalid form, please provide all the required details.', 'Registration unsuccessful')
    }
        
  }

}
