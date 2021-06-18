import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  image1:string = 'assets/Untitled design.png'
  constructor() { }

  ngOnInit(): void {
  }

}
