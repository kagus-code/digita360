import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  activationForm!:FormGroup

  phone_number:any


  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.activationForm = new FormGroup({
      'identification_number':new FormControl(null, [Validators.required]),
      'identification_doc':new FormControl(null, [Validators.required]),
      'passport_photo':new FormControl(null, [Validators.required]),
      'driving_license_picture':new FormControl(null),
      'KRA_pin':new FormControl(null, [Validators.required]), 
      'residence':new FormControl(null, [Validators.required]),
    
    });

    this.route.params.subscribe( params => {
       this.phone_number = params.id

       console.log(this.phone_number)
      //  console.log(params.get('id'))
    })
  }

  onChange(event){
    if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.activationForm.get('identification_doc').setValue(file);
    }
  }


  onChange1(event){
    if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.activationForm.get('passport_photo').setValue(file);
    }
  }

  
  onChange2(event){
    if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.activationForm.get('driving_license_picture').setValue(file);
    }
  }

  onsubmit(){
    const formData = new FormData();
    formData.append('identification_number', this.activationForm.get('identification_number').value);
    formData.append('identification_doc', this.activationForm.get('identification_doc').value);
    formData.append('passport_photo', this.activationForm.get('passport_photo').value);
    formData.append('driving_license_picture', this.activationForm.get('driving_license_picture').value);
    formData.append('KRA_pin', this.activationForm.get('KRA_pin').value);
    formData.append('residence', this.activationForm.get('residence').value);
    

    
    this.http.
              post(`http://localhost:8000/api/activation-post/${this.phone_number}/`,formData)  //this.activationForm.getRawValue()
              .subscribe( 
                        response =>{  
                                    console.log(response)
           
           
         alert("Your documents have been uploaded pending verification and approval.")
      // this.router.navigateByUrl('/login');
    })
  }


}
