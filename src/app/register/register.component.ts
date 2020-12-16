import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { SelectItem } from 'primeng-lts/api';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  title:any[];
  UserForm: FormGroup;
  submitted: boolean;
  Items: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private fb: FormBuilder,private api:ApiService,private router: Router,private activate: ActivatedRoute) { 
    this.Items = [];

    this.title = [
      { label: 'คำนำหน้า', value: 'คำนำหน้า' },
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }
    ];
  }

  ngOnInit(): void {

        this.UserForm = this.fb.group({
          'teacher_user': new FormControl('', Validators.required),
          'teacher_password': new FormControl('', Validators.required),
          'teacher_title': new FormControl('', Validators.required),
          'teacher_name': new FormControl('', Validators.required),
          'teacher_sname': new FormControl('', Validators.required),
          'teacher_tel': new FormControl('', Validators.required),
          'teacher_address': new FormControl('', Validators.required)
        });
  }


  ConfirmRegister(value: string){
    console.log(value);
    
    let SetData  = JSON.stringify({
      teacher_user: value['teacher_user'],
      teacher_password: value['teacher_password'],
      teacher_title: value['teacher_title'],
      teacher_name: value['teacher_name'],
      teacher_sname: value['teacher_sname'],
      teacher_address: value['teacher_address'],
      teacher_tel: value['teacher_tel']
      
    })
    let datapost = JSON.parse(SetData);
    
    console.log(datapost);
    
    this.api.RegisterTeacher(datapost).subscribe((DataRegister:any)=>{
      console.log(DataRegister);
      
      
    })
    this.router.navigate(['/login']);

  }

}
