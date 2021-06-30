import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }




  getUnApprovedUsers(){
   return this.http
        .get('https://kagusdigital360.herokuapp.com/api/get-invalidcustomers/')
        .pipe( 
          map(   // operator
                (responseData) =>{
                    

                    const postArray:User[] = [];

                    for(let key in responseData){//for-in loop, loops thru' objects

                        if(responseData.hasOwnProperty(key)){//hasOwnProperty returns a boolean value indicating whether the object on which you are calling it has a property with the name of the argument
                                postArray.push({...responseData[key],id:key})
                        }//
                            
                    }
                    
                    return postArray;

                }
         )
       );

   }


   getUserDocuments(id:any){
    return this.http
               .get(`https://kagusdigital360.herokuapp.com/api/user/activation-documents/${id}/`)
   }


   approveDocuments(phone_number:any){
        return this.http
                .patch(`https://kagusdigital360.herokuapp.com/api/activate-user/${phone_number}/`,{})
   }


   notifyUploadDocuments(phone_number:any){
        return this.http
                .post(`https://kagusdigital360.herokuapp.com/api/user/notify_email/${phone_number}/`,{})
   }


   declineDocs(phone_number:any){
            return this.http
                    .post(`https://kagusdigital360.herokuapp.com/api/user/notifyreupload_email/${phone_number}/`,{})
   }


}
