import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http:HttpClient) { 
    
  }


  getDataParent(teacher_id){
    environment
    let Url = environment.Url+'allparent/'+teacher_id;
    return this.http.get(Url);
  }
}
