import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-verificationdetails',
  templateUrl: './admin-verificationdetails.component.html',
  styleUrls: ['./admin-verificationdetails.component.css']
})
export class AdminVerificationdetailsComponent implements OnInit {

  phone_number:any

  details:any

  image1:string = 'assets/Untitled design.png'

  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
        this.route.params.subscribe(
              params=>{
                     this.userService
                          .getUserDocuments(params.phone_number)
                          .subscribe(
                                res => {
                                          this.details=res
                                          console.log(res);
                                          
                                       }
                                
                     )
              }

        )
  }

}
