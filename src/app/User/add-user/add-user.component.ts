import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { User, UserFilter } from '../user'
import { SharedService } from '../../Service/shared-service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers:[SharedService]
})
export class AddUserComponent implements OnInit {
  user:User = { User_Id:0, First_Name:"", Last_Name:"", Manager_Flag :false };
  userFilter:UserFilter = { FirstName:null, LastName:null };
  public userDetails: any;
  status:any;
  UpdateFlag:boolean=false;
  UserId:number;
  orderBy:string = "user.FirstName";
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  staticAlertClosed =false;
  successMessage: string;
  errorMessage:string;

  constructor(private _sharedService:SharedService, private _ModalService:NgbModal) { }

  ngOnInit() :void {
    this.GetUserDetails();

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(debounceTime(5000)).subscribe(() => this.errorMessage =null);

  }

  GetUserDetails() {
    this._sharedService.GetUserDetails().subscribe((data) => {this.userDetails = data});
  }

  Add(adduserForm: NgForm){
    if(this.UpdateFlag == false)
    {
      this._sharedService.AddUser(this.user).subscribe(  (value) => {
        this.status= value; 
        if(this.status == 'Error')
        {
         this._error.next("An error occured. Please contact admin team");
        }
        else {
          this._success.next("The user has been added successfully");
        }
        this.GetUserDetails();
        adduserForm.reset(); 
        this.UpdateFlag=false;});
    }
    else {
      this._sharedService.UpdateUser(this.user).subscribe(  (value) => {
        this.status= value; 
        if(this.status == 'Error')
        {
         this._error.next("An error occured. Please contact admin team");
        }
        else {
          this._success.next("The user has been updated successfully");
        }
        this.GetUserDetails();
        adduserForm.reset(); 
        this.UpdateFlag=false});
    }
 
  }

  Edit(UserId:number){
    this._sharedService.GetUserById(UserId).subscribe((data) => {this.user = data; this.UpdateFlag=true;})
  }

  ModelPopup(content, userId:number){
    this.UserId= userId;
    this._ModalService.open(content, { centered:true });
  }

  Delete(){
    console.log(this.UserId);
    this._sharedService.DeleteUser(this.UserId).subscribe((value) => {
      this.status = value; 
      if(this.status == 'Error')
      {
       this._error.next("An error occured. Please contact admin team");
      }
      else {
        this._success.next("The user has been deleted successfully");
      }
      console.log(this.status);
       this.GetUserDetails();
        this._ModalService.dismissAll();})
  }

}
