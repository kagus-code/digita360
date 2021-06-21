import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule  , Validators , FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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

  // form =new FormGroup({
  //   first_name:new FormControl('', [Validators.required]),
  //   last_name:new FormControl('', [Validators.required]),
  //   username:new FormControl('', [Validators.required]),
  //   email:new FormControl('', [Validators.required]),
  //   password:new FormControl('', [Validators.required]),
  // });
  // response: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    
    ){ 
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   first_name: '',
    //   last_name : '',
    //   email:'',
    //   phone_number:'',
    //   password:'',
    //   username:'',
    // }); 

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
                post('http://localhost:8000/api/user/register/',this.form.getRawValue())
                .subscribe(
                     response =>{console.log(response)
                      
                      alert("You have been Successfully Registered")


                      this.router.navigate(['/activation',this.form.get('phone_number').value ]);

                     }
                     ,
                     error => 
                     {
                          console.log(error.error)
                          this.errors= error.error
                          
                          this.loading=false

                          this.submitted=false
                     }
                  
                  )
    }
        

  }

}
