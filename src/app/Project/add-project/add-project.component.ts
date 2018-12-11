import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../Project';
import { SharedService } from '../../Service/shared-service'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers:[SharedService]
})
export class AddProjectComponent implements OnInit {
  project:Project = { Project_Id:0, Name:"", Priority:0, Start_Date:"", End_Date:"", Manager_Id:0 };
  Managers:any[];
  Status:any;

  constructor(private _sharedService:SharedService) { }

  ngOnInit() {
    this.GetManagers();
  }

  GetManagers() {
    this._sharedService.GetManagers().subscribe((data) => { this.Managers = data } );
  }

  AddProject(addProjectForm : NgForm){
    this._sharedService.AddProject(this.project).subscribe((value) => this.Status = value);
    addProjectForm.reset();
  }

}
