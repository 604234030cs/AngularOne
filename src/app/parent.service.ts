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
  getCheckDataParent(par_id){
    environment
    let Url = environment.Url+'checkparentparid/'+par_id;
    return this.http.get(Url);
  }
  getDeleteDataParent(par_id){
    environment
    let Url = environment.Url+'deletepar/'+par_id;
    return this.http.get(Url);
  }
  editDataParent(parent){

    // environment
    let Url = environment.Url+'editparent2/'+parent[0].par_id+'&&'+parent[0].par_user+'&&'+parent[0].par_title+'&&'+parent[0].par_name
    +'&&'+parent[0].par_sname+'&&'+parent[0].par_tel+'&&'+parent[0].par_address;
    return this.http.get(Url);
  }
}
