import { HistoryService } from './../history.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { SelectItem } from 'primeng-lts/api';

@Component({
  selector: 'app-namecheckinghistory',
  templateUrl: './namecheckinghistory.component.html',
  styleUrls: ['./namecheckinghistory.component.css']
})
export class NamecheckinghistoryComponent implements OnInit {



  Items: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  allDate: any = [];
  allClass: any = [];
  allListCheckName: any = [];
  selectClass: any;
  selectDate: any;

  constructor(private apihistorycheckname: HistoryService) {
    this.loadDataDate();
    this.loadDataClass();
  }

  ngOnInit(): void {

    this.items = [
      { label: '', icon: 'pi pi-fw pi-home' },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user', routerLink: "/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file', routerLink: "/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file', routerLink: "/namecheckinghistory" }

    ];
    this.activeItem = this.items[3];
  }

  loadDataDate() {
    let dataTeacher = JSON.parse(localStorage.getItem('user'))
    this.apihistorycheckname.getdate(dataTeacher.teacher_id).subscribe((dataDate: any) => {
      this.allDate = [
        {
          label: '-SeletDate-', value: null
        },
        ...dataDate.map(it => {
          return {
            label: it.check_data, value: it.check_data
          }
        })];
        // if(this.allDate.length >0){
        //   this.selectDate = this.allDate[0].value
        // }
    })
  }
  loadDataClass() {
    let dataTeacher = JSON.parse(localStorage.getItem('user'))
    this.apihistorycheckname.getclass(dataTeacher.teacher_id).subscribe((dataClass: any) => {
      this.allClass = [
        {
          label: '-SeletClass-',value: null
        },
        ...dataClass.map(it => {
          return {
            label: it.class_name , value: it.class_id
          }
        })
      ]

    })
  }
  listCheckName() {
    console.log(this.selectDate);
    console.log(this.selectClass);
    this.apihistorycheckname.getListCheckName(this.selectDate,this.selectClass).subscribe((dataListCheckName:any)=>{
      this.allListCheckName = dataListCheckName;
      console.log(this.allListCheckName);

    })
  }

}
