import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    let url = 'http://localhost/todoslim3/public/index.php/checkstudentname2/2020-12-13';
    return this.http.get(url);
  }
  getteacher(username,password){
    let url = 'http://localhost/todoslim3/public/index.php/teacherall/'+username+'&&'+password;
    return this.http.get(url);
  }
}
