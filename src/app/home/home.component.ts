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

  public list = [];
  public listdate = [];
  tiTle: any[];
  teacher: any = [];
  itemSelec: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  isEdit: boolean;
  selectedCity1;

  constructor(private api: ApiService, private router: Router) {
    this.isEdit = true
    this.itemSelec = [];
    this.loadData();

    this.tiTle = [
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }
    ];

  }


  loadData(){
    let teacher = JSON.parse(localStorage.getItem('user'));
    this.api.getTeacher(teacher.teacherUser, teacher.teacherPassword).subscribe((data: any) => {
      this.teacher = {
        teacherId:data.teacher_id,teacherUser:data.teacher_user,teacherPassword:data.teacher_password,teacherTitle:data.teacher_title,
        teacherName:data.teacher_name,teacherSname:data.teacher_sname,teacherAddress:data.teacher_address,teacherTel:data.teacher_tel,
        teacherLatitude:data.teacher_latitude,teacherLongitude:data.teacher_longitude
    }
    })
  }

  ngOnInit(): void {
    this.list = this.api.getList();
    this.items = [
      { label: '', icon: 'pi pi-fw pi-home' },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user',routerLink:"/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file',routerLink:"/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file',routerLink:"/namecheckinghistory" }
    ];
    this.activeItem = this.items[0];
  }

  logOut() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  conFirmEdit() {
    this.api.upDateDataTeacher(this.teacher.teacherId, this.teacher.teacherTitle, this.teacher.teacherName, this.teacher.teacherSname,
      this.teacher.teacherAddress, this.teacher.teacherTel).subscribe((DataUpdateTeacher: any) => {
        this.teacher = DataUpdateTeacher;
        this.loadData();
        this.isEdit = true;

      })
  }




}
