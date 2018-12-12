import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user'
import { SharedService } from '../../Service/shared-service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers:[SharedService]
})
export class AddUserComponent implements OnInit {
  user:User = { User_Id:0, First_Name:"", Last_Name:"", Manager_Flag :false };
  userDetails: any[];
  status:any;
  UpdateFlag:boolean=false;
  UserId:number;

  constructor(private _sharedService:SharedService, private _ModalService:NgbModal) { }

  ngOnInit() {
    this.GetUserDetails();
  }

  GetUserDetails() {
    this._sharedService.GetUserDetails().subscribe((data) => {this.userDetails = data});
  }

  Add(adduserForm: NgForm){
    if(this.UpdateFlag == false)
    {
      this._sharedService.AddUser(this.user).subscribe(  (value) => {this.status= value; this.GetUserDetails();adduserForm.reset(); this.UpdateFlag=false;});
    }
    else {
      this._sharedService.UpdateUser(this.user).subscribe(  (value) => {this.status= value; this.GetUserDetails();adduserForm.reset(); this.UpdateFlag=false});
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
    this._sharedService.DeleteUser(this.UserId).subscribe((value) => {this.status = value; this.GetUserDetails();})
  }

}
