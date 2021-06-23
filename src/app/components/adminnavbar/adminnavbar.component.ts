import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitters';
import { AdminAuthenticationService } from 'src/app/services/admin-authentication.service';


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
                    private router:Router,
                    private currentAdmin:AdminAuthenticationService

                    ) { }


        ngOnInit():void{
          this.currentAdmin.currentAdmin.subscribe( x => this.authenticated=x )
          

      }



      logout ():void{

          let confirmation=confirm("Do you really want to Logout"); 


          if(confirmation){
              this.currentAdmin
                  .logout()
                  .subscribe(
                    response =>{
                      
                      this.authenticated = false;

                      this.toastr.success('Successful Logout')

                      this.router.navigateByUrl('/adminlogin');

                      // location.reload();

                  },
                  error=>{
                       console.log(error);
                       this.toastr.error('Unsuccessful Logout')
                  }
                    
                    
                    
                    
                  )

          }

        
      }

}
