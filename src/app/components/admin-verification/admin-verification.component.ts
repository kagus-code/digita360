import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css']
})
export class AdminVerificationComponent implements OnInit {

  users:any = ''

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
         
    this.http
        .get('http://localhost:8000/api/get-invalidcustomers/')
        .subscribe(
              res=>{
                  // console.log(res)
                  this.users = res

                  Emitters.authEmitter.emit(true)
              },
              error=>{
                console.log(error.error)
              }
        )





  }

}
