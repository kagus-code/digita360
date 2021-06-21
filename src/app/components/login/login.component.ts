import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,ReactiveFormsModule , Validators , FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
 
 
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form! : FormGroup ;
 
 image1:string = 'assets/Untitled design.png'
 
 submitted:boolean=false
 
 loading:boolean=false
 
 server_errors:any
 
 constructor(
         private formbuilder: FormBuilder,
         private http: HttpClient,
         private router: Router,
        
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
                    //  console.log(response) 
      
                    
                     this.router.navigateByUrl('home');
             },
             error =>{
               this.loading=false
 
               this.server_errors=error.error
 
              //  console.log('error', error)
             }
           );
   }
 
 
 }
 
}
