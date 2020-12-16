import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getlist(){
    return [
      {"id": 1, "name": "arrawee","age":22},
      {"id": 2, "name": "rosdee","age":32}
    ]
  }

  getdate(){
    let url = environment.Url+'/checkstudentname2/2020-12-13';
    return this.http.get(url);
  }
  RegisterTeacher(datapost){
    
    let url = environment.Url+'/register';
    return this.http.post(url,datapost);
  }
  getteacher(username,password){
    environment

    let url = environment.Url+'/teacherall/'+username+'&&'+password;
    return this.http.get(url);
  }
  UpdateDataTeacher(teacher_id,teacher_title,teacher_name,teacher_sname,
    teacher_address,teacher_tel){
    let url = environment.Url+'/editteacher/'+teacher_id+'&&'+teacher_title+'&&'+teacher_name+'&&'+teacher_sname+'&&'+
    teacher_address+'&&'+teacher_tel;
    return this.http.get(url);
  }
}
