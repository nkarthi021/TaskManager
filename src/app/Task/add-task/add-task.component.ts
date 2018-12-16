import { Component, OnInit } from '@angular/core';
import { Task, TaskFilter  } from '../task';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/Operators';

import { SharedService } from '../../Service/shared-service'


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[SharedService]
  
 
})
export class AddTaskComponent implements OnInit {
  task:Task = { Name:"", Parent_Id:0, Task_Id:0, Priority:1, Start_Date:null, End_Date:null, Edit_Flag:true, User_Id:0, Project_Id:0 } ;
  taskDetails:any;
  taskFilter:TaskFilter = {Task:null, ParentTask:null, PriorityFrom:null, PriorityTo:null, StartDate:null, EndDate:null};
  parenttasks:any[];
  Status:any;
  projects:any[];
  users:any[];
  updateFlag:boolean =false;
  viewFlag:boolean = false;
  hasParentTaskFlag:boolean =false;

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  staticAlertClosed =false;
  successMessage: string;
  errorMessage:string;

  constructor(private _sharedService:SharedService) { }

  ngOnInit() {
   this.PageLoad();
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(debounceTime(5000)).subscribe(() => this.errorMessage =null);
  }

  PageLoad(){
  this._sharedService.GetTaskDetails().subscribe((values) => {this.taskDetails =values;});
  this._sharedService.GetParentTask(0).subscribe(values => { this.parenttasks = values });
  this._sharedService.GetUsers().subscribe((data) => {this.users = data;});
  this._sharedService.GetProjects().subscribe((data) => {this.projects = data;});
  this.task = { Name:"", Parent_Id:0, Task_Id:0, Priority:1, Start_Date:null, End_Date:null, Edit_Flag:true, User_Id:0, Project_Id:0 } ;
  }

  GetTaskDetails() {
    this._sharedService.GetTaskDetails().subscribe((values) => {this.taskDetails =values;});
  }

  onParentTaskFlagChange(event:any) {
    this.hasParentTaskFlag = !this.hasParentTaskFlag;
  }

  AddTask(taskForm: NgForm) {
    if(this.updateFlag == false)
      {
     this._sharedService.AddTaskDetails(this.task).subscribe(values => {
       this.Status = values; 
       if(this.Status == 'Error')
        {
         this._error.next("An error occured. Please contact admin team");
        }
        else {
          this._success.next("The Task has been added successfully");
        }
       taskForm.reset();
        this.PageLoad();
       });
      }
    else {
      this._sharedService.UpdateTaskDetails(this.task).subscribe((value) => {
        this.Status=value;
        if(this.Status == 'Error')
        {
         this._error.next("An error occured. Please contact admin team");
        }
        else {
          this._success.next("The Task has been updated successfully");
        }
         taskForm.reset();
          this.PageLoad();
          this.updateFlag=false;})
    }
  
    }

  LoadParentTask(TaskId : number){
       this._sharedService.GetParentTask(TaskId).subscribe(values => { this.parenttasks = values });
     
  }

  Edit(TaskId:number,EditFlag:boolean) {
     this._sharedService.GetTaskDetailsByTaskId(TaskId).subscribe((data) => { this.viewFlag = !EditFlag;
        this.task = data; 
        this.LoadParentTask(TaskId);
        if(this.task.Parent_Id !=0) {
          this.hasParentTaskFlag=true;
          } 
        else {this.hasParentTaskFlag=false; }
       this.updateFlag=true;
      });
  }

   UpdateEditFlag(TaskId:number){
     this._sharedService.UpdateEditFlag(TaskId,false).subscribe((data) => {this.Status=data; this.viewFlag=true; this.GetTaskDetails(); });
  }
  





}
