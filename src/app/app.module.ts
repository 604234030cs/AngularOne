import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng-lts/button';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ContextMenuModule} from 'primeng-lts/contextmenu';
import {CardModule} from 'primeng-lts/card';
import {AutoCompleteModule} from 'primeng-lts/autocomplete';
import {InputTextModule} from 'primeng-lts/inputtext';
import {InputTextareaModule} from 'primeng-lts/inputtextarea';
import {MessageModule} from 'primeng-lts/message';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {TabMenuModule} from 'primeng-lts/tabmenu';
import {ToggleButtonModule} from 'primeng-lts/togglebutton';
import {DropdownModule} from 'primeng-lts/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParentComponent } from './parent/parent.component';
import {TableModule} from 'primeng-lts/table';
import {ToastModule} from 'primeng-lts/toast';
import {CalendarModule} from 'primeng-lts/calendar';
import {SliderModule} from 'primeng-lts/slider';
import {MultiSelectModule} from 'primeng-lts/multiselect';
import {DialogModule} from 'primeng-lts/dialog';
import {ProgressBarModule} from 'primeng-lts/progressbar';
import { EditparentComponent } from './editparent/editparent.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ParentComponent,
    EditparentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ContextMenuModule,
    CardModule,
    InputTextModule,
    MessageModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    HttpClientModule,
    TabMenuModule,
    ToggleButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    ToastModule,
    SliderModule,
    CalendarModule,
    DialogModule,
    ProgressBarModule,
    MultiSelectModule

    

    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
