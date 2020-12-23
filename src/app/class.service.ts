import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  class: any = [];

  constructor(private http: HttpClient) {

  }
  getDataDetailClas(allClass) {
    console.log(allClass.classId);
    let url = environment.url + 'parentandstudent/' + allClass.classId
    return this.http.get(url).pipe(map((data: any) => {
      return data.map(it => {
        console.log(it);
        return {
          classId: it.class_id,
          latitude: it.latitude,
          longtitude: it.longitude,
          parentAddress: it.par_address,
          parentId: it.par_id,
          parentName: it.par_name,
          parentPassword: it.par_password,
          parentSname: it.par_sname,
          parentTel: it.par_tel,
          parentTitle: it.par_title,
          parentUser: it.par_user,
          studentId: it.st_id,
          studentName: it.student_name,
          studentNickname: it.student_nickname,
          studentSex: it.student_sex,
          studentSname: it.student_sname,
          studentTitle: it.student_title,
          teacherId: it.teacher_id
        }
      })
    }))
    // .pipe(map((data: any) => {
    //   console.log(data);
    //    [...data.map(it => {
    //     return {
    //       classId: it[0].class_id,
    //       latitude: it[0].latitude,
    //       longtitude: it[0].longtitude,
    //       parentAddress: it[0].par_address,
    //       parentId: it[0].par_id,
    //       parentName: it[0].par_name,
    //       parentPassword: it[0].par_password,
    //       parentSname: it[0].par_sname,
    //       parentTel: it[0].par_tel,
    //       parentTitle: it[0].par_title,
    //       parentUser: it[0].par_user,
    //       studentId: it[0].st_id,
    //       studentName: it[0].student_name,
    //       studentNickname: it[0].student_nickname,
    //       studentSex: it[0].student_sex,
    //       studentSname: it[0].student_sname,
    //       studentTitle: it[0].student_title,
    //       teacherId: it[0].teacher_id
    //     }
    //   })]
    // }));
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
    return this.http.get(url).pipe(map((result: any) => {
      console.log(result);

      return { classId: result[0].class_id, className: result[0].class_name, teacherId: result[0].teacher_id }
    }));

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
    let url = environment.url + 'addstudent2';
    return this.http.post(url, data);
  }
  editDataClassId(data) {
    console.log(data);

    let url = environment.url + 'saveeditclass/' + data.classId + '&&' + data.className
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
