import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateTaskComponent } from './update-task.component';
import { SharedService } from '../../Service/shared-service'


// describe('UpdateTaskComponent', () => {
//   let component: UpdateTaskComponent;
//   let fixture: ComponentFixture<UpdateTaskComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ UpdateTaskComponent ],
//       imports:[FormsModule,HttpClientModule, BsDatepickerModule.forRoot(),RouterTestingModule],
//       providers:[SharedService]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UpdateTaskComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
