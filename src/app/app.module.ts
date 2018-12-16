import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './Task/add-task/add-task.component';
import { ViewTaskComponent } from './Task/view-task/view-task.component';
import { UpdateTaskComponent } from './Task/update-task/update-task.component';
import { ViewTaskFilterPipe } from './Filter/view-task-filter.pipe';
import { AddUserComponent } from './User/add-user/add-user.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { ProjectFilterPipe } from './Filter/project-filter.pipe'
import { UserFilterPipe } from './Filter/user-filter.pipe';

const AppRoute : Routes = [
  {path:'addtask', component:AddTaskComponent },
  {path:'updatetask/:TaskId', component:UpdateTaskComponent},
  {path:'viewtask', component:ViewTaskComponent},
  {path:'adduser', component:AddUserComponent},
  {path:'addproject', component:AddProjectComponent},
  {path:'', component:ViewTaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    ViewTaskFilterPipe,
    AddUserComponent,
    AddProjectComponent,
    ProjectFilterPipe,
    UserFilterPipe
     ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, BsDatepickerModule.forRoot(), RouterModule.forRoot(AppRoute), FormsModule, NgbModule.forRoot(), DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
