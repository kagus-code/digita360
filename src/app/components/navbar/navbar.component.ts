import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated= false;

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit():void{
        Emitters.authEmitter.subscribe(
                       (res:boolean) => 
                               {
                                 this.authenticated=res
                                // console.log(res);
                                
                               }              
        )    
  }


  
  logout ():void{

        let cancel=confirm("Do you really want to Logout"); //ok cancel


        if(cancel){
            this.http
            .post('http://localhost:8000/logout/',{},{withCredentials:true})
            .subscribe(
              response =>{
                
                this.authenticated = false;
                this.router.navigateByUrl('/');

              })
        }

      
    }

}
