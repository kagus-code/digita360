import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
​
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
​
  user:any = []
  message =" "
​
  name='csrftoken'
  constructor(private http:HttpClient) { }
​
  ngOnInit(): void {
          this.http.get('http://localhost:8000/api/user/current-user/',
              {withCredentials:true})
              .subscribe(response =>{
                  console.log('Lorem ipsum');
                  
                  console.log(response);
                  this.user = response;
​
                  Emitters.authEmitter.emit(true)
              },
              error => {
                console.log('error', error)
                this.message ="no user found";
​
            }
          );
        
  }
​
}