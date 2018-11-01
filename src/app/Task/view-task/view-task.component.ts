import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService'
import { ITask } from '../task';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers:[SharedService]
})
export class ViewTaskComponent implements OnInit {
  taskDetails:any[];
  constructor(private _sharedService:SharedService) { }
 
  ngOnInit() {
    this._sharedService.GetTaskDetails().subscribe(values => {this.taskDetails =values});
    
   
  }
 
}
