import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css']
})
export class AdminVerificationComponent implements OnInit {

  users:any = ''

  constructor(private userService:UserService) { }

  ngOnInit(): void {
         
          this.userService
              .getUnApprovedUsers()
              .subscribe(
                    res=>{
                        this.users = res

                        Emitters.authEmitter.emit(true)
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
