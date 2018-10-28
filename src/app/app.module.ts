import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './Task/add-task/add-task.component';
import { ViewTaskComponent } from './Task/view-task/view-task.component';
import { UpdateTaskComponent } from './Task/update-task/update-task.component';

const AppRoute : Routes = [
  {path:'addtask', component:AddTaskComponent },
  {path:'updatetask', component:UpdateTaskComponent},
  {path:'viewtask', component:ViewTaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule.forRoot(AppRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
