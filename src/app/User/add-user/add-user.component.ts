import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
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

  constructor(private _sharedService:SharedService) { }

  ngOnInit() {

  }

  AddUser(adduserForm: NgForm){
    this._sharedService.AddUser(this.user).subscribe((value) => this.status= value);
    adduserForm.reset();
  }

}
