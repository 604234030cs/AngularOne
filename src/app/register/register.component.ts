import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng-lts/api';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  title: any[];
  userForm: FormGroup;
  submitted: boolean;
  itemSelect: SelectItem[];
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private activate: ActivatedRoute) {
    this.itemSelect = [];

    this.title = [
      { label: 'คำนำหน้า', value: 'คำนำหน้า' },
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }
    ];
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      'teacherUser': new FormControl('', Validators.required),
      'teacherPassword': new FormControl('', Validators.required),
      'teacherTitle': new FormControl('', Validators.required),
      'teacherName': new FormControl('', Validators.required),
      'teacherSname': new FormControl('', Validators.required),
      'teacherTel': new FormControl('', Validators.required),
      'teacherAddress': new FormControl('', Validators.required)
    });
  }

  ConfirmRegister(value: string) {

    let SetData = JSON.stringify({
      teacher_user: value['teacherUser'],
      teacher_password: value['teacherPassword'],
      teacher_title: value['teacherTitle'],
      teacher_name: value['teacherName'],
      teacher_sname: value['teacherSname'],
      teacher_address: value['teacherAddress'],
      teacher_tel: value['teacherTel']

    })
    let datapost = JSON.parse(SetData);
    this.api.registerTeacher(datapost).subscribe((DataRegister: any) => {

      
    })
    this.router.navigate(['/login']);
  }

}
