import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTableModule } from 'angular-6-datatable'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AddProjectComponent } from './add-project.component';
import { ProjectFilterPipe } from '../../Filter/project-filter.pipe'

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectComponent,ProjectFilterPipe ],
      imports:[FormsModule, HttpClientTestingModule, BsDatepickerModule.forRoot(), NgbModule.forRoot(), DataTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
