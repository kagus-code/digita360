import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
 
const material =[
   MatBadgeModule,
   MatButtonModule,
   MatCardModule,
   MatProgressBarModule
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
