import { Component, OnInit } from '@angular/core';
import { Task  } from '../task';
import { NgForm } from '@angular/forms'
import { SharedService } from '../../Service/SharedService'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[SharedService]
  
 
})
export class AddTaskComponent implements OnInit {
  task:Task = { Task1:null, Parent_Id:0, Task_Id:0, Priority:null, Start_Date:null, End_Date:null } ;
  parenttasks:any[];
  Status:any;

  constructor(private _sharedService:SharedService) { }

  ngOnInit() {
    this.LoadParentTask();
   
  }

  AddTask(taskForm: NgForm) {
    console.log('calling AddTask');
    this._sharedService.AddTaskDetails(this.task).subscribe(values => {this.Status = values});
    taskForm.reset();
    this.task ={Task1:null, Parent_Id:0, Task_Id:0, Priority:null, Start_Date:null, End_Date:null};
    this.LoadParentTask();
   
  }

  LoadParentTask(){
    console.log('Load Parent Task');
    this._sharedService.GetParentTask(0).subscribe(values => { this.parenttasks = values });
  }



}
