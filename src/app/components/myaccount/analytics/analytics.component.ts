import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  data:any ;

  user:any = ''
  message =" "

  name='csrftoken'

  account:any = ''

  transactions:any=''

  constructor(
    private current_user:ProfileService, 
    private http:HttpClient, 
    private toastr:ToastrService,
    private transactService:TransactionService
  ) { }

  ngOnInit(): void {
       Chart.register(...registerables);
       //fetches current user
       this.current_user
       .getCurrentUser()
       .subscribe(response =>{
          //  console.log('Lorem ipsum');
           
          //  console.log(response);
           this.user = response;


           //fetch accounts details
           this.current_user
           .getAccountDetails(this.user.phone_number)
           .subscribe(
             response => {
                 this.account = response
                //  console.log(response)
             },
             error=>{
                   console.log(error)
             }
           )

           //fetch transactions
              this.transactService
                  .getTransactions(this.user.phone_number)
                  .subscribe( 
                             res=>{ 
                                    this.transactions=res
                                    console.log(res);
                                      this.genetaChartData(res)
                                    }, 
                             error=>{
                                     console.log(error);
                                   }
                         )
       },
       error => {
         console.log('error', error)
         this.message ="no user found";

     }
       );
  }






      genetaChartData(data){
        var holder = {};

        data.forEach(function(d) {
                if (holder.hasOwnProperty(d.category.name)) {
                    holder[d.category.name] = holder[d.category.name] + d.amount;
                } else {
                    holder[d.category.name] = d.amount;
                }
        });

        var obj2 = [];

        for (var prop in holder) {
                obj2.push({ name: prop, value: holder[prop] });
        }


        var labels = []
        var dataset = []

        obj2.forEach(function(d) {
            labels.push(d.name)
            dataset.push(d.value)
        })

        console.log(labels)
        console.log(dataset)
        this.generateChart(labels,dataset)
        
    }


    //generate charts
    generateChart(label,dataset){

      var chart =new Chart('myChart',{
           type:'pie',
           data:{
            labels: label,
            datasets: [{
              label: 'Categories',
              data: dataset,
              backgroundColor: [
                'rgba(238, 81, 102, 0.8)',
                'rgba(209, 149, 146, 0.8)',
                'rgba(238, 150, 23, 0.8)',

                'rgba(254, 88, 88, 0.8)',
                'rgba(249, 99, 50, 0.8)',
                
                'rgba(255, 120, 120, 0.8)',
                'rgba(255, 0, 0, 0.8)'
              ],
              hoverOffset: 4
            }]
         }
      })
    }




}
