import { Component, OnInit } from '@angular/core';
import { ITask  } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
 
})
export class AddTaskComponent implements OnInit {
  Task: ITask

  constructor() { }

  ngOnInit() {
    this.Task.Task="Task 1";
    this.Task.ParentTaskId=1;
    this.Task.Priority=15;
    this.Task.StartDate="12/08/2018";
    this.Task.EndDate="21/09/2018";
  }

}
