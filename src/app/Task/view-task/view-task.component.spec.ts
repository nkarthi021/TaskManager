import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';

import { ViewTaskComponent } from './view-task.component';
import { ViewTaskFilterPipe } from '../../Filter/view-task-filter.pipe'
import { SharedService } from '../../Service/shared-service'
import { Observable } from 'rxjs/internal/Observable';
import { AddTaskComponent } from 'src/app/Task/add-task/add-task.component';



// describe('ViewTaskComponent', () => {
//   let component: ViewTaskComponent;
//   let fixture: ComponentFixture<ViewTaskComponent>;
//   let service: SharedService;
//   // let router : Router;
//   // let http: HttpClient;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ViewTaskComponent, ViewTaskFilterPipe ],
//       imports:[FormsModule,HttpClientTestingModule, BsDatepickerModule.forRoot(),RouterTestingModule],
//       providers:[SharedService]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewTaskComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     // service = new SharedService(http);
//     // component = new ViewTaskComponent(service,router);
//    // service = TestBed.get(SharedService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

  

// });
