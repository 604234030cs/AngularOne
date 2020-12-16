import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng-lts/api';
import {SelectItem} from 'primeng-lts/api';
import { environment } from 'src/environments/environment';




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
  teacher:any=[];

  
  isEdit: boolean ;


  constructor( private api:ApiService,private router:Router) { 
    this.isEdit = true
    this.Items = [];

    this.api.getdate().subscribe((data:any)=>{
      this.listdate = data;
      console.log(this.listdate);
      
    })
    let teacher = JSON.parse(localStorage.getItem('user'));
    console.log(teacher);
    this.api.getteacher(teacher.teacher_user,teacher.teacher_password).subscribe((dataTeacher:any)=>{
      console.log(dataTeacher);
      this.teacher = dataTeacher;
      
    })
    this.title = [
      {name: 'นางสาว'},
      {name: 'นาง'},
      {name: 'นาย'}
  ];
    
  }

  ngOnInit(): void {

    this.list = this.api.getlist();

    this.items = [
      {label: '', icon: 'pi pi-fw pi-home'},
      {label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user'},
      {label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file'},
      {label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file'}
      
  ];
  this.activeItem = this.items[0];
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  confirmEdit(){
    environment
    // let url = environment.URL +'/public/index.php/editteacher/'+this.teacher.teacher_id+'&&'+this.teacher.teacher_title+'&&'+this.teacher.teacher_name
    // +'&&'+this.teacher.teacher_sname+'&&'+this.teacher.teacher_address+'&&'+this.teacher.teacher_tel;
  }
  
  
  

}
