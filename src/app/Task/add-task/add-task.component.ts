import { Component, OnInit } from '@angular/core';
import { ITask  } from '../task';
import { SharedService } from '../../Service/SharedService'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[SharedService]
  
 
})
export class AddTaskComponent implements OnInit {
  task:ITask = { Task1:"", Parent_Id:0, Task_Id:0, Priority:1, Start_Date:"", End_Date:"" } ;
  parenttasks:any[];
  Status:any;

  constructor(private _sharedService:SharedService) { }

  ngOnInit() {
    
    this._sharedService.GetParentTask(0).subscribe(values => { this.parenttasks = values });
  }

  AddTask() {
    console.log('calling AddTask');
    this._sharedService.AddTaskDetails(this.task).subscribe(values => {this.Status = values});
    console.log(this.Status);
  }



}
