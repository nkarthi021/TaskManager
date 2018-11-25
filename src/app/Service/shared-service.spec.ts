import { async, TestBed, flush } from '@angular/core/testing'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http'

// import { Observable } from 'rxjs/internal/Observable';

import { SharedService } from './shared-service';
import { Task } from '../Task/task'
import { asyncData, asyncError } from '../Helpers/async-observable-helper'



describe('SharedService', () => {
    let httpClientSpy : {get : jasmine.Spy}
    let service :SharedService
    let http: HttpClient
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[SharedService]
        });
     httpClientSpy =jasmine.createSpyObj('HttpClient',['get'])
    //service = TestBed.get(SharedService);
     service = new SharedService(<any> httpClientSpy)
    //   service = new SharedService(http)
    });

    it('Should Return Expected Tasks (HttpClient Called Once)', ()=> {
       
        const dummyTasks:any[] = [
            {
              TaskId:1,
              Task:'Task 1',
              ParentTask:'',
              Priority:5,
              StartDate:'2018-11-01',
              EndDate:'2018-11-02',
              EditFlag:true
            },
            {
              TaskId:2,
              Task:'Task 2',
              ParentTask:'Task 1',
              Priority:10,
              StartDate:'2018-11-05',
              EndDate:'2018-11-06',
              EditFlag:true
            },
            {
              TaskId:3,
              Task:'Task 3',
              ParentTask:'Task 2',
              Priority:15,
              StartDate:'2018-11-10',
              EndDate:'2018-11-11',
              EditFlag:true
            }
          ]
          httpClientSpy.get.and.returnValue(asyncData(dummyTasks));
         service.GetTaskDetails().subscribe(
             tasks => expect(tasks).toEqual(dummyTasks,'expected tasks'), fail);
               
        expect(httpClientSpy.get.calls.count()).toBe(1,'one call'); 
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error:'test 404 error',
            status:404, statusText:'Not Found'
        });
        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        service.GetTaskDetails().subscribe(
            task => fail('Exptected an error, not taks'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});

describe('TaskService with(Mocks)', () => {
    let httpclient : HttpClient;
    let httpTestingcontroller : HttpTestingController;
    let service : SharedService;

    beforeEach(() => {
        TestBed.configureTestingModule({
           imports:[HttpClientTestingModule],
           providers :[SharedService]
        });
        httpclient = TestBed.get(HttpClient);
        httpTestingcontroller = TestBed.get(HttpTestingController);
        service = TestBed.get(SharedService);
    });

    afterEach(()=> {
         httpTestingcontroller.verify();
    });

    describe('#Get Tasks', () => {
        let expectedTasks : any[];
        
        beforeEach(() => {
               service = TestBed.get(SharedService);
               expectedTasks = [
                {
                  TaskId:1,
                  Task:'Task 1',
                  ParentTask:'',
                  Priority:5,
                  StartDate:'2018-11-01',
                  EndDate:'2018-11-02',
                  EditFlag:true
                },
                {
                  TaskId:2,
                  Task:'Task 2',
                  ParentTask:'Task 1',
                  Priority:10,
                  StartDate:'2018-11-05',
                  EndDate:'2018-11-06',
                  EditFlag:true
                },
                {
                  TaskId:3,
                  Task:'Task 3',
                  ParentTask:'Task 2',
                  Priority:15,
                  StartDate:'2018-11-10',
                  EndDate:'2018-11-11',
                  EditFlag:true
                }
              ] as any[];

        });

        it('should return expected tasks (called once)', () => {
            service.GetTaskDetails().subscribe(
                tasks => expect(tasks).toEqual(expectedTasks,'should retrun expected tasks'),
                fail);

            const req = httpTestingcontroller.expectOne(service.GET_ALL_TASK_URL);
            expect(req.request.method).toEqual('GET');
            req.flush(expectedTasks);
        });

        it('should turn 404 into user-friendly error', () => {
            const msg ='Delibrate 404'
          service.GetTaskDetails().subscribe(
              tasks => fail('expected to fail'),
              error => expect(error.message).toContain(msg)
            );
              const req = httpTestingcontroller.expectOne(service.GET_ALL_TASK_URL);
              req.flush(msg, {status:404, statusText:'Not Found'});
        });
    });
    describe('#Add Task', () => {
        
        it('It should add Task', () => {
         const task: Task =   { Task1:"Test Task 1", Parent_Id:0, Task_Id:0, Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', EditFlag:true } ;
         service.AddTaskDetails(task).subscribe(
             data => expect(data).toEqual('Success', 'should return task'),fail
         );
         const req =httpTestingcontroller.expectOne(service.ADD_TASK_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(task);
        });

    });

    describe('#Update Task', () => {
        
        it('It should Update Task', () => {
         const task: Task =   { Task1:"Test Task 1", Parent_Id:0, Task_Id:1, Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', EditFlag:true } ;
         service.UpdateTaskDetails(task).subscribe(
             data => expect(data).toEqual('Success', 'should return task'),fail
         );
         const req =httpTestingcontroller.expectOne(service.UPDATE_TASK_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(task);
        });

        it('It should Update Edit Flag as False', () => {
            
            service.UpdateEditFlag(1,false).subscribe(
                data => expect(data).toEqual('Success', 'should return success'),fail
            );
            const req =httpTestingcontroller.expectOne(service.UPDATE_EDIT_FLAG_URL);
            expect(req.request.method).toEqual('POST');
            
           });
   

    });

    
});

