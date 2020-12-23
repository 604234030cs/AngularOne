import {  Router } from '@angular/router';
import { ParentService } from './../parent.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng-lts/api';
import { MenuItem } from 'primeng-lts/api';
import { ConfirmationService } from "primeng-lts/api";
import { MessageService } from "primeng-lts/api";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `
  ],
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  title: any=[];
  allParentTotal: any=[];
  product: any=[];
  allParent:any=[];
  checkParent:any=[];
  selectedProduct: any;
  selectedProducts2:any;
  clonedProducts: { [s: string]: any; } = {};
  statuses: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  parentDialog: boolean;
  submitted: boolean;



  constructor(private apiParent: ParentService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) {


      this.loadDataParent2();
      this.title = [
        { label: 'นางสาว', value: 'นางสาว' },
        { label: 'นาง', value: 'นาง' },
        { label: 'นาย', value: 'นาย' }
      ];
   }


  ngOnInit(): void {

    this.items = [
      { label: '', icon: 'pi pi-fw pi-home', routerLink:"/home" },
      { label: 'ข้อมูลผู้ปกครอง', icon: 'pi pi-fw pi-user',routerLink:"/parent" },
      { label: 'ข้อมูลชั้นเรียน', icon: 'pi pi-fw pi-file',routerLink:"/class" },
      { label: 'ประวัติการเช็ค', icon: 'pi pi-fw pi-file',routerLink:"/namecheckinghistory" }

    ];
    this.activeItem = this.items[1];
    
  }

  loadDataParent2(){
  
    let dataTeacher = JSON.parse(localStorage.getItem('user'))
    this.apiParent.getDataParent(dataTeacher.teacherId).subscribe((data:any)=>{
      this.allParentTotal = data.map(it=>{
          return {
            parentLatitude:it.latitude,parentLongtitude:it.longitude,parentAddress:it.par_address,
            parentId:it.par_id,parentName:it.par_name,parentSname:it.par_sname,parentPassword:it.par_password,
            parentTel:it.par_tel,parentTitle:it.par_title,parentUser:it.par_user,teacherId:it.teacher_id
          }
      })
    })
  }

  onRowEditInit(parent: any) {

    let id = parent.parentId;
    this.apiParent.getCheckDataParent(id).subscribe((datacheckparent:any)=>{
      this.checkParent = {
        parentLatitude:datacheckparent[0].latitude,parentLongtitude:datacheckparent[0].longitude,parentAddress:datacheckparent[0].par_address,
        parentId:datacheckparent[0].par_id,parentName:datacheckparent[0].par_name,parentSname:datacheckparent[0].par_sname,parentPassword:datacheckparent[0].par_password,
        parentTel:datacheckparent[0].par_tel,parentTitle:datacheckparent[0].par_title,parentUser:datacheckparent[0].par_user,teacherId:datacheckparent[0].teacher_id
      }
      this.parentDialog = true;
    })
  }

  saveEditParent(){

    this.apiParent.editDataParent(this.checkParent).subscribe((dataEditingParent:any)=>{
      console.log(dataEditingParent);
      if(dataEditingParent == 'Success'){
        this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'แก้ไขข้อมูลผู้ปกครองสำเร็จ', life: 3000});
      }else{
        this.messageService.add({severity:'danger', summary: 'เสร็จสิ้น', detail: 'แก้ไขข้อมูลผู้ปกครองไม่สำเร็จ', life: 3000});
      }
      this.parentDialog = false;
      this.loadDataParent2();
    })  

      
  }
  saveDeleteParent(parent:any){
    let id = parent.parentId;
    this.apiParent.getCheckDataParent(id).subscribe((datacheckparent:any)=>{
      this.checkParent = {
        parentLatitude:datacheckparent[0].latitude,parentLongtitude:datacheckparent[0].longitude,parentAddress:datacheckparent[0].par_address,
        parentId:datacheckparent[0].par_id,parentName:datacheckparent[0].par_name,parentSname:datacheckparent[0].par_sname,parentPassword:datacheckparent[0].par_password,
        parentTel:datacheckparent[0].par_tel,parentTitle:datacheckparent[0].par_title,parentUser:datacheckparent[0].par_user,teacherId:datacheckparent[0].teacher_id
      }
      this.confirmationService.confirm({
        message: 'คุณต้องการลบผู้ปกครอง ' + this.checkParent.parentId+this.checkParent.parentName  +'  '+ this.checkParent.Sname + '?',
        header: 'ยืนยัน',
        icon: 'pi pi-exclamation-triangle',
        accept: ()=>{
          console.log(this.checkParent.parentId);
          
          this.apiParent.getDeleteDataParent(this.checkParent.parentId).subscribe((dataDeleteParent)=>{
            if(dataDeleteParent == 'Success' ){
              console.log("สำเร็จ");
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลผู้ปกครองสำเร็จ', life: 3000});
              this.loadDataParent2();
            }else{
              console.log("ไม่สำเร็จ");
              this.messageService.add({severity:'danger', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลผู้ปกครองไม่สำเร็จ', life: 3000});
            }
          })
        }
    })
    })

  }
  
  hideDialog(){
  this.parentDialog = false;  
  }

  goHome(){
  this.router.navigate(['/home']);
  }


  

}
