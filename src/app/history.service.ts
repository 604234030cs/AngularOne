import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }


  
  getdate(teacher_id){
    let url = environment.Url+'/allcheckdate/'+teacher_id;
    return this.http.get(url);
  }
  getclass(teacher_id){
    let url = environment.Url+'/allclass/'+teacher_id;
    return this.http.get(url);
  }
  getListCheckName(check_data,class_id){
    let url = environment.Url+'/checknamefromdate/'+check_data+'&&'+class_id;
    return this.http.get(url);
  }
}
