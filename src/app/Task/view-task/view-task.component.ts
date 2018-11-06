import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../Service/SharedService'
import { Task, TaskFilter } from '../task';



@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers:[SharedService]
})
export class ViewTaskComponent implements OnInit {
  taskDetails:any[];
  taskFilter:TaskFilter = {Task:null, ParentTask:null, PriorityFrom:null, PriorityTo:null, StartDate:null, EndDate:null};
  constructor(private _sharedService:SharedService) { }
 
  ngOnInit() {
  
    
    this._sharedService.GetTaskDetails().subscribe(values => {this.taskDetails =values});
    
   
  }
 
}
