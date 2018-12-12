import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../Project';
import { SharedService } from '../../Service/shared-service'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [SharedService]
})
export class AddProjectComponent implements OnInit {
  project: Project = { Project_Id: 0, Name: "", Priority: 0, Start_Date: "", End_Date: "", Manager_Id: 0 };
  Managers: any[];
  projectDetails: any[];
  Status: any;
  UpdateFlag: boolean = false;

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.GetManagers();
    this.GetProjectDetails();
  }

  GetProjectDetails() {
    this._sharedService.GetProjectDetails().subscribe((data) => { this.projectDetails = data });
  }


  GetManagers() {
    this._sharedService.GetManagers().subscribe((data) => { this.Managers = data });
  }

  AddProject(addProjectForm: NgForm) {
    if (this.UpdateFlag == false) {
      this._sharedService.AddProject(this.project).subscribe((value) => {
        this.Status = value;
        addProjectForm.reset();
        this.GetManagers();
        this.GetProjectDetails();

      });
    }
    else {
      this._sharedService.UpdateProject(this.project).subscribe((value) => {
        this.Status = value;
        this.GetManagers();
        this.GetProjectDetails();
        this.UpdateFlag = false;
      });
    }


  }

  Edit(ProjectId: number) {
    this._sharedService.GetProjectById(ProjectId).subscribe((data) => { this.project = data; this.UpdateFlag = true; })
  }



}
