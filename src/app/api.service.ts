import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getList() {
    return [
      { "id": 1, "name": "arrawee", "age": 22 },
      { "id": 2, "name": "rosdee", "age": 32 }
    ]
  }

  registerTeacher(datapost) {
    let url = environment.url + '/register';
    return this.http.post(url, datapost);
  }

  getTeacher(username, password) {
    let url = environment.url + '/teacherall/' + username + '&&' + password;
    return this.http.get(url);
  }

  upDateDataTeacher(teacher_id, teacher_title, teacher_name, teacher_sname, teacher_address, teacher_tel) {
    let url = environment.url + '/editteacher/' + teacher_id + '&&' + teacher_title + '&&' + teacher_name + '&&' + teacher_sname + '&&' +
      teacher_address + '&&' + teacher_tel;
    return this.http.get(url);
  }
}
