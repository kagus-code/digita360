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

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = this.formbuilder.group({
      phone_number:"",
      password:"",
    });
  }

  submit(): void{
    this.http.post('http://localhost:8000/api/user/login/',this.form.getRawValue(),
    {withCredentials:true})
    .subscribe(
      response => {
        console.log(response)
        
        this.router.navigateByUrl('home');
      },
      error => console.log('error', error)
    ); 
  }

}
