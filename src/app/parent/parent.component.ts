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
  products: any=[];
  product: any=[];
  allParent:any=[];
  checkParent:any=[];

  statuses: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;

  parentDialog: boolean;
  submitted: boolean;
  
  clonedProducts: { [s: string]: any; } = {};
  constructor(private apiParent: ParentService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) {

      this.loadDataParent();
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

  loadDataParent(){
    
    let dataTeacher = JSON.parse(localStorage.getItem('user'))
    this.apiParent.getDataParent(dataTeacher.teacher_id).subscribe(data => {
      this.allParent = data;
      console.log(this.allParent);
      
 
    });
 
  }

  loadDataParent2(){
  
    let dataTeacher = JSON.parse(localStorage.getItem('user'))
    this.apiParent.getDataParent(dataTeacher.teacher_id).subscribe(data => {
      this.products = data;
 
    });
  }

  onRowEditInit(parent: any) {

    let id = parent.par_id;
    this.apiParent.getCheckDataParent(id).subscribe((datacheckparent:any)=>{
      this.checkParent = datacheckparent;
      this.parentDialog = true;
    })
    // this.router.navigate(['/editparent',id]);
  }

  saveEditParent(){

    this.apiParent.editDataParent(this.checkParent).subscribe((dataEditingParent:any)=>{
      console.log(dataEditingParent);
      this.parentDialog = false;
      this.loadDataParent2();
      
    })  

      
  }
  saveDeleteParent(parent:any){
    let id = parent.par_id;
    console.log(id);
    this.apiParent.getCheckDataParent(id).subscribe((datacheckparent:any)=>{
      this.checkParent = datacheckparent;
      console.log(this.checkParent);

      this.confirmationService.confirm({
        message: 'คุณต้องการลบผู้ปกครอง ' + this.checkParent[0].par_title+this.checkParent[0].par_name  +'  '+ this.checkParent[0].par_sname + '?',
        header: 'ยืนยัน',
        icon: 'pi pi-exclamation-triangle',
        accept: ()=>{
          console.log(this.checkParent[0].par_id);
          
          this.apiParent.getDeleteDataParent(this.checkParent[0].par_id).subscribe((dataDeleteParent)=>{
            if(dataDeleteParent == 'Success' ){
              console.log("สำเร็จ");
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลผู้ปกครองสำเร็จ', life: 3000});
            }else{
              console.log("ไม่สำเร็จ");
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลผู้ปกครองไม่สำเร็จ', life: 3000});
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

// onRowEditSave(parent: any) {

//       this.router.navigate(['/editparent']);
// }

// onRowEditCancel(parent: any, index: number) {
//   this.allParent[index] = this.clonedProducts[parent.par_id];
//   delete this.allParent[parent.par_id];
// }
// onRowDeletSave(parent){
//   let id = parent.par_id;
//   console.log(parent.par_address);
  
// }


  

}
