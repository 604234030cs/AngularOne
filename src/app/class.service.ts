import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpClient) {

   }

   getDataClass(teacher_id){
     let Url = environment.Url+'allclass/'+teacher_id
     return this.http.get(Url);
   }
   getDataClassId(class_id){
 
     let Url = environment.Url+'classid/'+class_id
     return this.http.get(Url);
   }
   getDataClassName(class_name,teacher_id){
 
     let Url = environment.Url+'checkclassid/'+class_name+'&&'+teacher_id
     return this.http.get(Url);
   }
   addDataClassName(data){
    console.log(data);
  
     let Url = environment.Url+'addclass';
     return this.http.post(Url,data);
   }
   editDataClassId(data){
    console.log(data);
  
     let Url = environment.Url+'saveeditclass/'+data[0].class_id+'&&'+data[0].class_name
     return this.http.get(Url);
   }
   deleteDataClassId(class_id){
    console.log(class_id);
  
     let Url = environment.Url+'deleteclass/'+class_id
     return this.http.get(Url);
   }

}
