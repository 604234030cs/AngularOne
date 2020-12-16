import { ApiService } from './../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng-lts/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
  
})
export class LoginComponent implements OnInit {

  userform: FormGroup;
  submitted: boolean;
  username;
  password;
  teacher;

  currentPath: string = ''
  hideMenu: any = ['/login']
  constructor(private fb: FormBuilder, private messageService: MessageService,private router:Router, private activate: ActivatedRoute
    ,private api: ApiService) { }

  ngOnInit(): void {

    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.username = value['username'];
    this.password = value['password'];
    console.log(this.username);
    console.log(this.password);
    
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted', sticky: true});
    this.api.getteacher(this.username,this.password).subscribe((data:any)=>{
    this.teacher = data;
    console.log("value:username",this.username);
    console.log("value:password",this.password);
    console.log("database:username",this.teacher.teacher_user);
    console.log("database:password",this.teacher.teacher_password);
    console.log();
    
      

    if(this.teacher.teacher_user == this.username && this.teacher.teacher_password == this.password){
      let user = {
        teacher_id:data['teacher_id'],
        teacher_user:data['teacher_user'],
        teacher_password:data['teacher_password'],
      }
      localStorage.setItem('user',JSON.stringify(user));
      this.router.navigate(['/home'])
    }
    else{
      console.log("พาสเวิดไม่ถูกต้อง");
      
    }
  })
  }



}
