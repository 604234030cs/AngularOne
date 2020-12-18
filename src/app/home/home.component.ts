import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { SelectItem } from 'primeng-lts/api';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: any[];
  selectedCity1;
  public list = [];
  public listdate = [];
  Items: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  teacher: any = [];

  isEdit: boolean;


  constructor(private api: ApiService, private router: Router) {
    this.isEdit = true
    this.Items = [];
    this.loaddata();

    this.title = [
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }
    ];

  }


  loaddata(){
    let teacher = JSON.parse(localStorage.getItem('user'));
    console.log(teacher);
    this.api.getteacher(teacher.teacher_user, teacher.teacher_password).subscribe((dataTeacher: any) => {
      console.log(dataTeacher);
      this.teacher = dataTeacher;

    })
  }

  ngOnInit(): void {

    this.list = this.api.getlist();

    this.items = [
      { label: '', icon: 'pi pi-fw pi-home' },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user',routerLink:"/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file',routerLink:"/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file',routerLink:"/namecheckinghistory" }

    ];
    this.activeItem = this.items[0];
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  confirmEdit() {

    let Teacher_Title = this.teacher.teacher_title;
    console.log(Teacher_Title);

    this.api.UpdateDataTeacher(this.teacher.teacher_id, Teacher_Title, this.teacher.teacher_name, this.teacher.teacher_sname,
      this.teacher.teacher_address, this.teacher.teacher_tel).subscribe((DataUpdateTeacher: any) => {
        this.teacher = DataUpdateTeacher;
        this.isEdit = true;
      })
    // let url = environment.Url +'/editteacher'+this.teacher.teacher_id+'&&'+this.teacher.teacher_title+'&&'+this.teacher.teacher_name
    // +'&&'+this.teacher.teacher_sname+'&&'+this.teacher.teacher_address+'&&'+this.teacher.teacher_tel;

  }




}
