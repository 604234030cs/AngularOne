import { ApiService } from './../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng-lts/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  userform: FormGroup;
  submitted: boolean;
  username;
  password;
  teacher: any = [];
  currentPath: string = ''
  hideMenu: any = ['/login']
  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activate: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit(): void {

    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.username = value['username'];
    this.password = value['password'];
    this.api.getTeacher(this.username, this.password).subscribe((data: any) => {
      this.teacher = {
        teacherId: data.teacher_id, teacherUser: data.teacher_user, teacherPassword: data.teacher_password, teacherTitle: data.teacher_title,
        teacherName: data.teacher_name, teacherSname: data.teacher_sname, teacherAddress: data.teacher_address, teacherTel: data.teacher_tel,
        teacherLatitude: data.teacher_latitude, teacherLongitude: data.teacher_longitude
      }
      if (this.teacher.teacherUser == this.username && this.teacher.teacherPassword == this.password) {
        let user = {
          teacherId: this.teacher.teacherId,
          teacherUser: this.teacher.teacherUser,
          teacherPassword: this.teacher.teacherPassword,
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home'])
      }
      else {

      }
    })
  }

}
