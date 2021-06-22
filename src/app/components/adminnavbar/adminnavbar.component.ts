import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-adminnavbar',
  templateUrl:'./adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {
        authenticated:boolean=false

        constructor(
                    private http:HttpClient,
                    private toastr:ToastrService,
                    private router:Router
                    ) { }


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

          let cancel=confirm("Do you really want to Logout"); 


          if(cancel){
              this.http
              .post('http://localhost:8000/logout/',{},{withCredentials:true})
              .subscribe(
                response =>{
                  
                  this.authenticated = false;

                  this.toastr.success('Successful Logout')

                  this.router.navigateByUrl('/adminlogin');

                })
          }

        
      }

}
