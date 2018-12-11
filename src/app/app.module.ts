import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './Task/add-task/add-task.component';
import { ViewTaskComponent } from './Task/view-task/view-task.component';
import { UpdateTaskComponent } from './Task/update-task/update-task.component';
import { ViewTaskFilterPipe } from './Filter/view-task-filter.pipe';
import { AddUserComponent } from './User/add-user/add-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { UpdateProjectComponent } from './Project/update-project/update-project.component'

const AppRoute : Routes = [
  {path:'addtask', component:AddTaskComponent },
  {path:'updatetask/:TaskId', component:UpdateTaskComponent},
  {path:'viewtask', component:ViewTaskComponent},
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
    UpdateUserComponent,
    AddProjectComponent,
    UpdateProjectComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, BsDatepickerModule.forRoot(), RouterModule.forRoot(AppRoute), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
