import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon'
 
const material =[
   MatBadgeModule,
   MatButtonModule,
   MatCardModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatIconModule
]



@NgModule({
  imports: [
    material,
    CommonModule
  ],
  exports:[
    material
  ]
})
export class MaterialModule { }
