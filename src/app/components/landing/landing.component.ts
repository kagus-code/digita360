import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user:any = []
  message =" "
  constructor(  private http: HttpClient,) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user/current-user/',
    {withCredentials:true})
    .subscribe(response =>{

        console.log(response);
        this.user = response;
        console.log(this.user.first_name)
    },
    error => {
      console.log('error', error)
      this.message ="no user found";
      //redirect
  }
);
}

}
