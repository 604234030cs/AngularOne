import { ClassService } from './../class.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { SelectItem } from 'primeng-lts/api';
import { ConfirmationService } from "primeng-lts/api";
import { MessageService } from "primeng-lts/api";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `
  ],
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  Items: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  allClass:any=[];
  checkclass:any=[];
  classDialog: boolean;
  submitted: boolean;
  class: any;


  constructor(private router: Router,private apiClass: ClassService,private messageService: MessageService,private confirmationService: ConfirmationService) { 
    this. loadDataClass()
  }

  ngOnInit(): void {

    this.items = [
      { label: '', icon: 'pi pi-fw pi-home' },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user',routerLink:"/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file',routerLink:"/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file',routerLink:"/namecheckinghistory" }

    ];
    this.activeItem = this.items[2];
  }
  loadDataClass(){
    let dataTeacher = JSON.parse(localStorage.getItem('user'));
    this.apiClass.getDataClass(dataTeacher.teacher_id).subscribe((data:any)=>{
      this.allClass = data;
      console.log(this.allClass);
    });
  }

  onRowEditInit(parent: any){
    let id = parent.class_id;
    this.apiClass.getDataClassId(id).subscribe((datacheckclass:any)=>{
      this.checkclass = datacheckclass;
      this.classDialog = true;
    })
  }

  saveEditClass(){
    
    console.log("ปุ่มแก้ไข");

    console.log(this.checkclass[0].class_name);
    
    this.apiClass.editDataClassId(this.checkclass).subscribe((dataEditingClass:any)=>{
      console.log(dataEditingClass);
      this.classDialog = false;
      this.messageService.add({severity:'success',summary:'เสร็จสิ้น',detail:'แก้ไขข้อมูลชั้นเรียนสำเร็จ',life:3000})
      this.loadDataClass();
      
    })
  }

  saveDeleteParent(parent: any){
   
    console.log("ปุ่มลบ"); 
    console.log(parent.class_id);
    let id = parent.class_id;
    this.apiClass.getDataClassId(id).subscribe((dataCheckClass:any)=>{
      this.checkclass = dataCheckClass;
      this.confirmationService.confirm({
        message: 'คุณต้องการลบชั้นเรียน '+this.checkclass[0].class_name + ' ? ',
        header: 'ยืนยัน',
        icon: 'pi pi-question',
        accept: ()=>{
          this.apiClass.deleteDataClassId(this.checkclass[0].class_id).subscribe((dataDeleteClass:any)=>{
            if(dataDeleteClass == 'Success'){
              console.log("สำเร็จ");
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลชั้นเรียนสำเร็จ', life: 3000});
              this.loadDataClass();
            }else{
              console.log("ไม่สำเร็จ");
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลชั้นเรียนไม่สำเร็จ', life: 3000});   
            }
          })
        }
      })
    })

  }
  hideDialog(){

    this.classDialog = false;  
    this.submitted = false;
    
  }
  openNew(){
    
    this.checkclass =[{}];
    this.submitted = true;
   
  }
  saveAddClass(){
    console.log("ปุ่มเพิ่ม");
    console.log(this.checkclass[0].class_name);

    let dataTeacher = JSON.parse(localStorage.getItem('user'));
    let setData = JSON.stringify({
      class_name:this.checkclass[0].class_name,
      teacher_id:dataTeacher.teacher_id
    })
    let dataPost = JSON.parse(setData);
    this.apiClass.getDataClassName(this.checkclass[0].class_name,dataTeacher.teacher_id).subscribe((dataCheckClass)=>{
      console.log(dataCheckClass);
      if(dataCheckClass == false){
        
        this.confirmationService.confirm({
          message: 'คุณต้องการเพิ่มข้อมูลชั้นเรียน',
          header: 'ยืนยัน',
          icon: 'pi pi-question',
          accept: ()=> {
            this.apiClass.addDataClassName(dataPost).subscribe((dataAddClass:any)=>{
              if(dataAddClass == 'Success'){
                this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนสำเร็จ', life: 3000});
                this.submitted = false;
                this.loadDataClass();
              }else{
                this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนไม่สำเร็จ', life: 3000});
                this.submitted = false;

              }
            })
          }
        })
      }else{
        this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ชื่อชั้นเรียนถูกใช้ไปแล้ว', life: 3000});
        this.submitted = false;
      }
    })
  }
}
