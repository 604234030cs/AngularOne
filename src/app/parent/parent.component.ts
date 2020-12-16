import {  Router } from '@angular/router';
import { ParentService } from './../parent.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng-lts/api';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  providers: [MessageService],
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`],
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


  products: any=[];

  allParent:any=[];
  statuses: SelectItem[];
  clonedProducts: { [s: string]: any; } = {};
  constructor(private apiParent: ParentService,private messageService: MessageService,private router: Router) {

      this.loadDataParent();
      this.loadDataParent2();
   }

  ngOnInit(): void {
    
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
      console.log(this.products);
      
    });
 
  }

  onRowEditInit(parent: any) {
    console.log(parent);
    console.log(parent.par_id);
    let id = parent.par_id;
    this.router.navigate(['/editparent',id]);
}
onRowEditSave(parent: any) {
      this.router.navigate(['/editparent']);
}

onRowEditCancel(parent: any, index: number) {
  this.allParent[index] = this.clonedProducts[parent.par_id];
  delete this.allParent[parent.par_id];
}
onRowDeletSave(parent){
  let id = parent.par_id;
  console.log(parent.par_address);
  
}

  

}
