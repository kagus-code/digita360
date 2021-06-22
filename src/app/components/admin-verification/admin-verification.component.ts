import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css']
})
export class AdminVerificationComponent implements OnInit {

  users:any = ''

  user:any

  constructor(private userService:UserService, private current_user:ProfileService) { }

  ngOnInit(): void {
          //fetch current user
          this.current_user
              .getCurrentUser()
              .subscribe(response =>{
                  console.log(response);
                  this.user = response;

                  Emitters.authEmitter.emit(true)
              },
              error => {
                console.log('error', error)
            }
          );
         
          //fetch display users

          this.userService
              .getUnApprovedUsers()
              .subscribe(
                    res=>{
                        this.users = res

                    },
                    error=>{
                      console.log(error.error)
                    }
              )
  }


  onGetUserDocs(id){
        this.userService
            .getUserDocuments(id)
            .subscribe(
                 res => console.log(res)
            )

  }

}
