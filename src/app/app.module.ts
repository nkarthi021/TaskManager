import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './Task/add-task/add-task.component';
import { ViewTaskComponent } from './Task/view-task/view-task.component';
import { UpdateTaskComponent } from './Task/update-task/update-task.component';
import { ViewTaskFilterPipe } from './Filter/viewtaskfilter.pipe'

const AppRoute : Routes = [
  {path:'addtask', component:AddTaskComponent },
  {path:'updatetask/:TaskId', component:UpdateTaskComponent},
  {path:'viewtask', component:ViewTaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    ViewTaskFilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, RouterModule.forRoot(AppRoute), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
