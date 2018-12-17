import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/shared-service';
import { NgForm } from '@angular/forms';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  providers:[SharedService]
})
export class UpdateTaskComponent implements OnInit {
 task:Task = { Name:null, Parent_Id:0, Task_Id:0, Priority:null, Start_Date:null, End_Date:null, Edit_Flag:true, User_Id:2, Project_Id:1  } ;
  parenttasks:any[];
  Status:any;
  constructor(private _sharedService:SharedService, private _activateRoute :ActivatedRoute,private _router:Router) {

   }

  ngOnInit() {
    let TaskId = this._activateRoute.snapshot.params['TaskId'];
    if(TaskId != undefined)
    {
    this.LoadParentTask(TaskId);
    this._sharedService.GetTaskDetailsByTaskId(TaskId).subscribe(values => {this.task =values});
    }
    
  }

  LoadParentTask(TaskId:number){
       this._sharedService.GetParentTask(TaskId).subscribe(values => { this.parenttasks = values });
  }

  UpdateTask(updatetaskForm:NgForm){
    this._sharedService.UpdateTaskDetails(this.task).subscribe(value => { this.Status = value; this._router.navigate(["/viewtask"]);  });
  //  updatetaskForm.reset();
    
  }

   

}
