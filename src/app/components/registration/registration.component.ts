import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule  , Validators , FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

        form! : FormGroup ;

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
                      post('https://kagusdigital360.herokuapp.com/api/user/register/',this.form.getRawValue())
                      .subscribe(
                          response =>{
                            console.log(response)
                            
                            this.toastr.success('You have been Successfully Registered.', 'Registration successful')

                            this.router.navigate(['/activation',this.form.get('phone_number').value ]);

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


  // submit(): void{
  //   this.submitted=true
  //   if(this.form.valid){
  //     this.loading=true
  //     this.http.post('http://localhost:8000/api/user/register/',this.form.getRawValue())
  //       .subscribe(
  //             response =>{console.log(response)
  //             alert("You have been Successfully Registered")
  //             this.router.navigate(['/activation',this.form.get('phone_number').value]);
  //             },
  //             error =>
  //               {
  //                   console.log(error.error)
  //                   this.errors= error.error
  //                   this.loading=false
  //                   this.submitted=false
  //               })
  //           }
  //         }

}
