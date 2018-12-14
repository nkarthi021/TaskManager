import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal }  from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { Project } from '../Project';
import { SharedService } from '../../Service/shared-service'
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [SharedService]
})
export class AddProjectComponent implements OnInit {
  project: Project = { Project_Id: 0, Name: "", Priority: 0, Start_Date: "", End_Date: "", Manager_Id: 0 };
  Managers: any[];
  public projectDetails: any;
  Status: any;
  UpdateFlag: boolean = false;
  ProjectId:number;
  setDateFlag:boolean=false;

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  staticAlertClosed = false;
  successMessage:string;
  errorMessage:string;

  constructor(private _sharedService: SharedService, private _modalService:NgbModal) { }

  ngOnInit() {
    this.GetManagers();
    this.GetProjectDetails();

    setTimeout(() => this.staticAlertClosed = true,20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(debounceTime(5000)).subscribe(() => this.errorMessage = null);

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
        if(this.Status == "Success"){
          this._success.next("The project has been added successfully");
        }
        else
        {
          this._error.next("Something happened wrong. Please check with admin team");
        }
        addProjectForm.reset();
        this.GetManagers();
        this.GetProjectDetails();

      });
    }
    else {
      this._sharedService.UpdateProject(this.project).subscribe((value) => {
        this.Status = value;
        if(this.Status == "Success"){
          this._success.next("The project has been updated successfully");
        }
        else
        {
          this._error.next("Something happened wrong. Please check with admin team");
        }
        addProjectForm.reset();
        this.GetManagers();
        this.GetProjectDetails();
        this.UpdateFlag = false;
      });
    }
  }

  Edit(ProjectId: number) {
    this._sharedService.GetProjectById(ProjectId).subscribe((data) => { this.project = data; this.UpdateFlag = true; })
  }

  OpenModalPopup(Content, ProjectId:number){
    this.ProjectId=ProjectId;
    this._modalService.open(Content, {centered : true});
  }

  Delete() {
    console.log(this.ProjectId);
    this._sharedService.DeleteProject(this.ProjectId).subscribe((value) => {
      this.Status = value;
      console.log(this.Status);
      if(this.Status == "Success"){
        this._success.next("The user has been deleted successfully");
        console.log(this.successMessage);
      }
      else
      {
        
        this._error.next("Something happened wrong. Please check with admin team");
        console.log(this.errorMessage);
      }
      this.GetManagers();
      this.GetProjectDetails();
      this._modalService.dismissAll();
    });
  }

  onSetDateChange(event:any){
    console.log('check event');
    this.setDateFlag = !this.setDateFlag;
    if(!this.setDateFlag){this.project.Start_Date=null; this.project.End_Date=null;}
  }

}
