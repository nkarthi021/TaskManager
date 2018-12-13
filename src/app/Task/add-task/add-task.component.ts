import { Component, OnInit } from '@angular/core';
import { Task  } from '../task';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { SharedService } from '../../Service/shared-service'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[SharedService]
  
 
})
export class AddTaskComponent implements OnInit {
  task:Task = { Name:"", Parent_Id:0, Task_Id:0, Priority:1, Start_Date:null, End_Date:null, Edit_Flag:true, User_Id:0, Project_Id:0 } ;
  parenttasks:any[];
  Status:any;
  projects:any[];
  users:any[];

  constructor(private _sharedService:SharedService, private _router:Router) { }

  ngOnInit() {
    this.LoadParentTask();
    this._sharedService.GetUsers().subscribe((data) => {this.users = data;});
    this._sharedService.GetProjects().subscribe((data) => {this.projects = data;});
  }

  AddTask(taskForm: NgForm) {
     this._sharedService.AddTaskDetails(this.task).subscribe(values => {this.Status = values; console.log(this.Status); this._router.navigate(["/viewtask"]);});
    // taskForm.reset();
     }

  LoadParentTask(){
      this._sharedService.GetParentTask(0).subscribe(values => { this.parenttasks = values });
  }



}
