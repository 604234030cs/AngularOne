import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { ButtonModule } from 'primeng-lts/button';
import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { ContextMenuModule } from 'primeng-lts/contextmenu';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { InputTextModule } from 'primeng-lts/inputtext';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { MessageModule } from 'primeng-lts/message';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { ProgressBarModule } from 'primeng-lts/progressbar';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { RatingModule } from 'primeng-lts/rating';
import { SliderModule } from 'primeng-lts/slider';
import { TableModule } from 'primeng-lts/table';
import { TabMenuModule } from 'primeng-lts/tabmenu';
import { ToastModule } from 'primeng-lts/toast';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassService } from './class.service';
import { ClassComponent } from './class/class.component';
import { ClassdetailComponent } from './classdetail/classdetail.component';
import { DesignloginComponent } from './designlogin/designlogin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NamecheckinghistoryComponent } from './namecheckinghistory/namecheckinghistory.component';
import { ParentService } from './parent.service';
import { ParentComponent } from './parent/parent.component';
import { RegisterComponent } from './register/register.component';

// import { MessageService } from 'primeng-lts/api';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ParentComponent,
    ClassComponent,
    NamecheckinghistoryComponent,
    ClassdetailComponent,
    DesignloginComponent
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
    MultiSelectModule,
    ToolbarModule,
    RatingModule,
    FileUploadModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule
    

    

    
  ],
  providers: [ApiService, MessageService, ConfirmationService,ParentService,ClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
