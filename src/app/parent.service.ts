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
    
    let url = environment.url+'allparent/'+teacher_id;
    return this.http.get(url);
  }
  getCheckDataParent(parentId){
    
    let url = environment.url+'checkparentparid/'+parentId;
    return this.http.get(url);
  }
  getCheckDataParentId(parentId){
    
    let url = environment.url+'checkparentparid/'+parentId;
    return this.http.get(url);
  }
  getCheckDataParentUser(parentUser){
    
    let url = environment.url+'checkparentuser/'+parentUser;
    return this.http.get(url);
  }
  getDeleteDataParent(ParentId){
    
    let url = environment.url+'deletepar/'+ParentId;
    return this.http.get(url);
  }
  addDataParent(data){
    
    let url = environment.url+'registerparent2';
    return this.http.post(url,data);
  }
  editDataParent(parent){

    let url = environment.url+'editparent2/'+parent.parentId+'&&'+parent.parentUser+'&&'+parent.parentTitle+'&&'+parent.parentName
    +'&&'+parent.parentSname+'&&'+parent.parentTel+'&&'+parent.parentAddress;
    return this.http.get(url);
  }
}
