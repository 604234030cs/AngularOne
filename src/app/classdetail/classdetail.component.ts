import { ParentService } from './../parent.service';
import { ClassService } from './../class.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from "primeng-lts/api";
import { MessageService } from "primeng-lts/api";

@Component({
  selector: 'app-classdetail',
  templateUrl: './classdetail.component.html',
  styleUrls: ['./classdetail.component.css']
})
export class ClassdetailComponent implements OnInit {

  titleStudent: any=[];
  titleParent: any=[];
  sex: any=[];
  allDataDetailClass:any=[];
  allClass:any=[];
  allStudent:any=[];
  allParent:any=[];
  allSeleteParent:any=[];
  teacher:any;
  class:any;
  selectParent: any;
  classDialog: boolean;
  parentDialog: boolean;
  addStudent: boolean;
  addParent: boolean;




  constructor(private router: Router,private apiClass: ClassService,private apiparent: ParentService,private messageService: MessageService,private confirmationService: ConfirmationService) {

    this.allClass = JSON.parse(localStorage.getItem('keyClass'));
    this.loadDataClassDetail();
    this.loadDataParent();

   }

  ngOnInit(): void {
    this.titleStudent = [
      { label: 'เลือกคำหน้า', value: '' },
      { label: 'เด็กหญิง', value: 'เด็กหญิง' },
      { label: 'เด็กชาย', value: 'เด็กชาย' }

    ];
    this.titleParent = [
      { label: 'เลือกคำหน้า', value: '' },
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }

    ];
    this.sex = [
      { label: 'เลือกเพศ', value: '' },
      { label: 'หญิง', value: 'หญิง' },
      { label: 'ชาย', value: 'ชาย' }

    ];
    
  }

  goHome(){
    this.router.navigate(['/class']);
    }
  
  loadDataClassDetail(){
    
    this.apiClass.getDataDetailClas(this.allClass).subscribe((data:any)=>{
      console.log(data);
      this.allDataDetailClass = data;
      // .map(it=>{
      //   return {
      //     classId:it.classId,latitude:it.latitude,longtitude:it.longtitude,parentAddress:it.par_address,parentId:it.par_id,parentName:it.par_name,parentPassword:it.par_password,
      //     parentSname:it.par_sname,parentTel:it.par_tel,parentTitle:it.par_title,parentUser:it.par_user,studentId:it.st_id,studentName:it.student_name,studentNickname:it.student_nickname,
      //     studentSex:it.student_sex,studentSname:it.student_sname,studentTitle:it.student_title,teacherId:it.teacher_id
      //   }
      // })   
    })
  }

  hideDialog(){

    this.classDialog = false;  
    this.parentDialog = false;  
    this.addStudent = false;
  }

  saveEditStudent(){
    
    this.apiClass.editDataStudent(this.allStudent).subscribe((dataEditingStudent:any)=>{
      this.loadDataClassDetail();
      this.parentDialog = false;
      this.classDialog = false;
    })
  }
  
  saveEditParent(){
    
    this.apiparent.editDataParent(this.allParent).subscribe((dataEditingParent:any)=>{
      this.parentDialog = false;
      this.classDialog = false;
      this.loadDataClassDetail();
      
    }) 
  }

  editParent(parent: any){
    
    let parentUser = parent.parentUser;
    this.apiparent.getCheckDataParentUser(parentUser).subscribe((data:any)=>{
      this.allParent = {
        parentId:data[0].par_id,parentUser:data[0].par_user,parentPassword:data[0].par_password,parentTitle:data[0].par_title,parentName:data[0].par_name,parentSname:data[0].par_sname,
        parentTel:data[0].par_tel,parentAddress:data[0].par_address,parentLatitude:data[0].latitude,parentLongtitude:data[0].longitude
    }
      this.classDialog = false;  
      this.parentDialog = true;  
    })
  }

  backToStudent(){
    this.classDialog = true;  
    this.parentDialog = false; 
  }

  onRowEditInit(parent: any){
  
    let studentId = parent.studentId;
    this.apiClass.getDataStudentId(studentId).subscribe((data:any)=>{
      this.allStudent = {
          parentUser:data.par_user,studentId:data.st_id,studentName:data.student_name,studentNickname:data.student_nickname,
          studentSex:data.student_sex,studentSname:data.student_sname,studentTitle:data.student_title,classId:data.class_id
      }
      this.classDialog = true;  
      this.parentDialog = false;  
    }) 
  }

  saveDeleteStudent(parent: any){

    let id = parent.studentId;
    this.apiClass.getDataStudentId(id).subscribe((data:any)=>{
      this.allStudent = {
        parentUser:data.par_user,studentId:data.st_id,studentName:data.student_name,studentNickname:data.student_nickname,
        studentSex:data.student_sex,studentSname:data.student_sname,studentTitle:data.student_title,classId:data.class_id
    }
      this.confirmationService.confirm({
        message: 'คุณต้องการลบนักเรียน ' + this.allStudent.studentTitle+this.allStudent.studentName+'  '+this.allStudent.studentSname+'?',
        header: 'ยืนยัน',
        icon: 'pi pi-exclamation-triangle',
        accept: ()=>{  
          this.apiClass.deleteDataStudentId(this.allStudent.studentId).subscribe((dataDeleteStudent)=>{
            if(dataDeleteStudent == 'Success' ){
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลนักเรียนสำเร็จ', life: 3000});
            }else{
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ลบข้อมูลนักเรียนไม่สำเร็จ', life: 3000});
            }
          })
          this.loadDataClassDetail();
        }
      })
    })
  }

  openNewaddstudent(){
    this.addStudent = true;
    this.addParent = false;
    this.parentDialog= false;
    this.classDialog = false;
  }

  loadDataParent(){
    this.teacher = JSON.parse(localStorage.getItem('user'));
    this.apiparent.getDataParent(this.teacher.teacherId).subscribe((dataparent:any)=>{
      this.allSeleteParent = [
        {
          label: '-เลือกผู้ปกครอง-', value: null
        },
        ...dataparent.map(it =>{
          return {
            label: it.par_name+' '+it.par_sname, value: it.par_user
          }
        })
      ]
    })
  }

  addparent(){
    this.addParent = true
  }

  addStudentInClass(){
    let setData = JSON.stringify({
      student_title:this.allDataDetailClass.studentTitle,
      student_name:this.allDataDetailClass.studentName,
      student_sname:this.allDataDetailClass.studentSname,
      student_nickname:this.allDataDetailClass.studentNickname,
      student_sex:this.allDataDetailClass.studentSex,
      class_id:this.allClass.classId,
      par_user:this.selectParent
    })
    let dataPost = JSON.parse(setData);
    if(dataPost != false){
        
      this.confirmationService.confirm({
        message: 'คุณต้องการเพิ่มข้อมูลนักเรียน',
        header: 'ยืนยัน',
        icon: 'pi pi-question',
        accept: ()=> {
          this.apiClass.addDataStudent(dataPost).subscribe((dataAddStudent:any)=>{
            if(dataAddStudent == 'Success'){
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลนักเรียนสำเร็จ', life: 3000});
              this.addStudent = false;
              this.loadDataClassDetail();
            }else{
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลนักเรียนไม่สำเร็จ', life: 3000});
              this.addStudent = false;
            }
          })
        }
      })
    }else{
      this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'ชื่อนักเรียนถูกใช้ไปแล้ว', life: 3000});
      this.addStudent = false;
    }
    
  }

  addParentInClass(){

    this.teacher = JSON.parse(localStorage.getItem('user')); 
    let setData = JSON.stringify({
      par_user:this.allDataDetailClass.parentUser,
      par_password:this.allDataDetailClass.parentPassword,
      par_title:this.allDataDetailClass.parentTitle,
      par_name:this.allDataDetailClass.parentName,
      par_sname:this.allDataDetailClass.parentSname,
      par_tel:this.allDataDetailClass.parentTel,
      par_address:this.allDataDetailClass.parentAddress,
      latitude:'null ',
      longitude:'null',
      teacher_id:this.teacher.teacherId
    })
    let dataPost = JSON.parse(setData);
    if(dataPost != false){
        
      this.confirmationService.confirm({
        message: 'คุณต้องการเพิ่มข้อมูลผู้ปกครอง',
        header: 'ยืนยัน',
        icon: 'pi pi-question',
        accept: ()=> {
          this.apiparent.addDataParent(dataPost).subscribe((dataAddParent:any)=>{
            if(dataAddParent == 'Success'){
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลผู้ปกครองสำเร็จ', life: 3000});
              this.addParent = false;
              this.loadDataParent();
            }else{
              this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลผู้ปกครองไม่สำเร็จ', life: 3000});
              this.addParent = false;
            }
          })
        }
      })
    }else{
      this.messageService.add({severity:'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มผู้ปกครองไม่ถูกต้อง', life: 3000});
      this.addParent = false;
    }
  } 

}
