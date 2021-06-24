import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { ProfileService } from 'src/app/services/profile.service';

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
  constructor(private http:HttpClient, private current_user:ProfileService) { }

  ngOnInit(): void {
    this.current_user
        .getCurrentUser()
        .subscribe(response =>{
            console.log('Lorem ipsum');
            
            console.log(response);
            this.user = response;

            Emitters.authEmitter.emit(true)
        },
        error => {
          console.log('error', error)
          this.message ="no user found";

      }
    );
        
  }
​
}