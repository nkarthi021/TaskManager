import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router'
import { SharedService } from '../../Service/shared-service'
import { Task, TaskFilter } from '../task';



@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers:[SharedService]
})
export class ViewTaskComponent implements OnInit {
  taskDetails:any[]=[];
  status:any;
  taskFilter:TaskFilter = {Task:null, ParentTask:null, PriorityFrom:null, PriorityTo:null, StartDate:null, EndDate:null};
  constructor(private _sharedService:SharedService, private _router:Router) { }
 
  ngOnInit() {
      this.GetTaskDetails();
  }

  GetTaskDetails() {
    this._sharedService.GetTaskDetails().subscribe((values) => 
    {
      console.log('GetTaskDetails');
      this.taskDetails =values;
      console.log(this.taskDetails);
    });
    
  }

  UpdateEditFlag(TaskId:number){
    console.log(TaskId);
    this._sharedService.UpdateEditFlag(TaskId,false).subscribe((data) => {this.status=data;this.GetTaskDetails()});
    
  }
  UpdateTask(TaskId:number) {
     this._router.navigate(["/updatetask", TaskId]);
  }
}
