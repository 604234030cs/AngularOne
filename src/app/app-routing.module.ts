import { NamecheckinghistoryComponent } from './namecheckinghistory/namecheckinghistory.component';
import { ClassComponent } from './class/class.component';
import { EditparentComponent } from './editparent/editparent.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'parent',component: ParentComponent},
  {path: 'class',component: ClassComponent},
  {path: 'namecheckinghistory',component: NamecheckinghistoryComponent},
  {path: 'editparent/:id',component: EditparentComponent},
  {path: 'register',component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
