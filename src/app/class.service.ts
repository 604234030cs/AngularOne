import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  class:any=[];

  constructor(private http: HttpClient) {

  }
  getDataDetailClas(allClass) {
    console.log(allClass.classId);

    let url = environment.url + 'parentandstudent/' + allClass.classId
    return this.http.get(url)
  }
  getDataStudentId(studentId) {
    console.log(studentId);

    let url = environment.url + 'studentId/' + studentId
    return this.http.get(url)
  }

  getDataClass(teacherId) {
    let url = environment.url + 'allclass/' + teacherId
    return this.http.get(url);
  }
  getDataClassId(classId) {

    let url = environment.url + 'classid/' + classId;
    return this.http.get(url);
  
    
    // return this.http.get(url).pipe(map((result:any)=>{result.class_id,result.class_name,result.teacher_id}),);
  }
  getDataClassName(className, teacherId) {

    let url = environment.url + 'checkclassid/' + className + '&&' + teacherId
    return this.http.get(url);
  }
  addDataClassName(dataPost) {
    let url = environment.url + 'addclass';
    return this.http.post(url, dataPost);
  }
  addDataStudent(data) {
    console.log(data);
    let url = environment.url + 'addstudent2';
    return this.http.post(url, data);
  }
  editDataClassId(data) {
    console.log(data);

    let url = environment.url + 'saveeditclass/' + data[0].classId + '&&' + data[0].className
    return this.http.get(url);
  }
  editDataStudent(student) {
    console.log(student.studentId);

    let url = environment.url + 'editstudent2/' + student.studentId + '&&' + student.studentTitle + '&&' + student.studentName + '&&' + student.studentSname
      + '&&' + student.studentNickname + '&&' + student.studentSex;
    return this.http.get(url)
  }
  deleteDataClassId(classId) {
    console.log(classId);

    let url = environment.url + 'deleteclass/' + classId
    return this.http.get(url);
  }
  deleteDataStudentId(st_id) {
    let url = environment.url + 'deletest/' + st_id;

    return this.http.get(url)
  }





}
