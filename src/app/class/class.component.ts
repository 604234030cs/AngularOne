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

  itemsSelect: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  classDialog: boolean;
  submitted: boolean;
  class: any;
  allClass:any=[];
  checkClass:any=[];
  selectedProducts2:any;
  selectedProduct: any;


  constructor(private router: Router,private apiClass: ClassService,private messageService: MessageService,private confirmationService: ConfirmationService) { 
    this. loadDataClass()
  }

  ngOnInit(): void {

    this.items = [
      { label: '', icon: 'pi pi-fw pi-home',routerLink:"/home" },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user',routerLink:"/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file',routerLink:"/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file',routerLink:"/namecheckinghistory" }

    ];
    this.activeItem = this.items[2];
  }

  loadDataClass(){

    let dataTeacher = JSON.parse(localStorage.getItem('user'));
    this.apiClass.getDataClass(dataTeacher.teacherId).subscribe((data:any)=>{
      this.allClass = data.map(it=>{
        return {
          classId: it.class_id ,className:it.class_name,teacherId:it.teacher_id
        }
      })
    });
  }

  onRowEditInit(parent: any){

    let id = parent.classId;
    this.apiClass.getDataClassId(id).subscribe((data:any)=>{

      this.checkClass = data;
      console.log(this.checkClass);
      // this.checkClass = data.map(it=>{
      //   return{
      //     classId: it.class_id ,className:it.class_name,teacherId:it.teacher_id
      //   }
      // })
      this.classDialog = true;
    })
  }

  saveEditClass(){
      
    this.apiClass.editDataClassId(this.checkClass).subscribe((dataEditingClass:any)=>{
      this.classDialog = false;
      this.messageService.add({severity:'success',summary:'เสร็จสิ้น',detail:'แก้ไขข้อมูลชั้นเรียนสำเร็จ',life:3000})
      this.loadDataClass();
    })
  }

  saveDeleteClass(parent: any){

    let id = parent.classId;
    this.apiClass.getDataClassId(id).subscribe((dataCheckClass:any)=>{
      this.checkClass = dataCheckClass;
      // {classId:dataCheckClass[0].class_id,className:dataCheckClass[0].class_name,teacherId:dataCheckClass[0].teacher_id}
      this.confirmationService.confirm({
        message: 'คุณต้องการลบชั้นเรียน '+this.checkClass.className + ' ? ',
        header: 'ยืนยัน',
        icon: 'pi pi-question',
        accept: ()=>{
          this.apiClass.deleteDataClassId(this.checkClass.classId).subscribe((dataDeleteClass:any)=>{
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
    
    this.checkClass =[{}];
    this.submitted = true;
   
  }

  saveAddClass(){

    let dataTeacher = JSON.parse(localStorage.getItem('user'));
    let setData = JSON.stringify({
      class_name:this.checkClass[0].className,
      teacher_id:dataTeacher.teacherId
    })
    let dataPost = JSON.parse(setData);
    this.apiClass.getDataClassName(this.checkClass[0].className,dataTeacher.teacherId).subscribe((dataCheckClass)=>{
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

  onRowSelect(event) {

    let keyClass = { 
        classId:event.data.classId,
        className:event.data.className
      }
    localStorage.setItem('keyClass',JSON.stringify(keyClass));
      this.router.navigate(['/classDetail'])
    this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
  }
  
  onRowUnselect(event) {
    this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
  }
}
