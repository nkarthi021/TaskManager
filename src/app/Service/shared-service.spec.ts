import { async, TestBed, flush } from '@angular/core/testing'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { asyncData, asyncError } from '../Helpers/async-observable-helper'

// import { Observable } from 'rxjs/internal/Observable';

import { SharedService } from './shared-service';
import { Task } from '../Task/task'
import { Project } from '../Project/Project';
import { User } from '../User/user'




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

    // Task  
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

    // User 
    it('Should Return Expected Users (HttpClient Called Once)', ()=> {
       
        const dummyUsers:any[] = [
            {
              UserId:1,
              FirstName:'User 1',
              LastName: 'User Test 2',
              Manager : 'Manager 1'
            },
            {
               UserId:2,
              FirstName:'User 2',
              LastName: 'User Test 2',
              Manager : 'Manager 2'
            },
            {
               UserId:3,
              FirstName:'User 3',
              LastName: 'User Test 3',
              Manager : 'Manager 3'
            }
          ]
          httpClientSpy.get.and.returnValue(asyncData(dummyUsers));
         service.GetTaskDetails().subscribe(
             tasks => expect(tasks).toEqual(dummyUsers,'expected users'), fail);
               
        expect(httpClientSpy.get.calls.count()).toBe(1,'one call'); 
    });

    // Project 
     it('Should Return Expected Projects (HttpClient Called Once)', ()=> {
       
        const dummyProjects:any[] = [
            {
              ProjectId:1,
              Name:'Project 1',
              StartDate: '2018-12-01',
              EndData:'2018-12-01',
              Manager : 'Manager 1'
            },
            {
              ProjectId:1,
              Name:'Project 2',
              StartDate: '2018-12-04',
              EndData:'2018-12-05',
              Manager : 'Manager 2'
            },
            {
              ProjectId:1,
              Name:'Project 3',
              StartDate: '2018-12-10',
              EndData:'2018-12-12',
              Manager : 'Manager 3'
            }
          ]
          httpClientSpy.get.and.returnValue(asyncData(dummyProjects));
         service.GetTaskDetails().subscribe(
             tasks => expect(tasks).toEqual(dummyProjects,'expected projects'), fail);
               
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

// Task Service Add Update
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
         const task: Task =   { Name:"Test Task 1", Parent_Id:0, Task_Id:0, Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', Edit_Flag:true, Project_Id:1, User_Id:1 } ;
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
         const task: Task =   { Name:"Test Task 1", Parent_Id:0, Task_Id:1, Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', Edit_Flag:true,Project_Id:1, User_Id:1 } ;
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
            const req =httpTestingcontroller.expectOne(service.UPDATE_EDIT_FLAG_URL+1+'&EditFlag=false');
            expect(req.request.method).toEqual('POST');
            
           });
   

    });

    
});

// User Service Add , Udpate, Delete
describe('User Service with(Mocks)', () => {
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

    describe('#Get Users', () => {
        let expectedUsers : any[];
        
        beforeEach(() => {
               service = TestBed.get(SharedService);
               expectedUsers = [
                {
                  ProjectId:1,
                  Name:'Project 1',
                  Manager:'Manager 1',
                  Priority:5,
                  StartDate:'2018-12-04',
                  EndDate:'2018-12-06'
                },
                {
                  ProjectId:2,
                  Name:'Project 2',
                  Manager:'Manager 2',
                  Priority:10,
                  StartDate:'2018-12-10',
                  EndDate:'2018-12-12'
                },
                {
                  ProjectId:1,
                  Name:'Project 3',
                  Manager:'Manager 3',
                  Priority:15,
                  StartDate:'2018-12-01',
                  EndDate:'2018-12-02'
                }
              ] as any[];

        });

        it('should return expected users (called once)', () => {
            service.GetUserDetails().subscribe(
                tasks => expect(tasks).toEqual(expectedUsers,'should retrun expected users'),
                fail);

            const req = httpTestingcontroller.expectOne(service.GET_ALL_USERS_URL);
            expect(req.request.method).toEqual('GET');
            req.flush(expectedUsers);
        });

        it('should turn 404 into user-friendly error', () => {
            const msg ='Delibrate 404'
          service.GetUserDetails().subscribe(
              tasks => fail('expected to fail'),
              error => expect(error.message).toContain(msg)
            );
              const req = httpTestingcontroller.expectOne(service.GET_ALL_USERS_URL);
              req.flush(msg, {status:404, statusText:'Not Found'});
        });
    });
    describe('#Add User', () => {
        
        it('It should add User', () => {
         const user: User =   { User_Id:0, First_Name:'Test User 1', Last_Name:'Test', Manager_Flag:true } ;
         service.AddUser(user).subscribe(
             data => expect(data).toEqual('Success', 'should return task'),fail
         );
         const req =httpTestingcontroller.expectOne(service.ADD_USER_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(user);
        });

    });

    describe('#Update User', () => {
        
        it('It should Update User', () => {
         const user: User =   {  User_Id:1, First_Name:'Test User 2', Last_Name:'Test', Manager_Flag:false } ;
         service.UpdateUser(user).subscribe(
             data => expect(data).toEqual('Success', 'should return user'),fail
         );
         const req =httpTestingcontroller.expectOne(service.UPDATE_USER_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(user);
        });

    });

     describe('#Delete User', () => {
        
        it('It should delete User', () => {
        
         service.DeleteUser(1).subscribe(
             data => expect(data).toEqual('Success', 'should return user'),fail
         );
         const req =httpTestingcontroller.expectOne(service.DELETE_USER_URL+1);
         expect(req.request.method).toEqual('POST');
         //expect(req.request.body).toEqual('Success');
        });

    });

    
});


// Project Service Add, Update and Delete

describe('Project Service with(Mocks)', () => {
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

    describe('#Get Projects', () => {
        let expectedProjects : any[];
        
        beforeEach(() => {
               service = TestBed.get(SharedService);
               expectedProjects = [
                {
                  ProjectId:2,
                  Name:'Project 1',
                  Manager:'Manager 1',
                  Priority:5,
                  StartDate:'2018-12-01',
                  EndDate:'2018-12-02'
                   },
                {
                 ProjectId:2,
                  Name:'Project 2',
                  Manager:'Manager 2',
                  Priority:5,
                  StartDate:'2018-12-04',
                  EndDate:'2018-12-05'
                },
                {
                 ProjectId:3,
                  Name:'Project 3',
                  Manager:'Manager 3',
                  Priority:5,
                  StartDate:'2018-11-10',
                  EndDate:'2018-11-11'
                }
              ] as any[];

        });

        it('should return expected projects (called once)', () => {
            service.GetProjectDetails().subscribe(
                tasks => expect(tasks).toEqual(expectedProjects,'should retrun expected projects'),
                fail);

            const req = httpTestingcontroller.expectOne(service.GET_ALL_PROJECTS_URL);
            expect(req.request.method).toEqual('GET');
            req.flush(expectedProjects);
        });

        it('should turn 404 into user-friendly error', () => {
            const msg ='Delibrate 404'
          service.GetProjectDetails().subscribe(
              tasks => fail('expected to fail'),
              error => expect(error.message).toContain(msg)
            );
              const req = httpTestingcontroller.expectOne(service.GET_ALL_PROJECTS_URL);
              req.flush(msg, {status:404, statusText:'Not Found'});
        });
    });
    describe('#Add Project', () => {
        
        it('It should add projecct', () => {
         const project: Project =   { Name:"Test Project 1", Project_Id:0,  Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', Manager_Id:1 } ;
         service.AddProject(project).subscribe(
             data => expect(data).toEqual('Success', 'should return Project'),fail
         );
         const req =httpTestingcontroller.expectOne(service.ADD_PROJECT_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(project);
        });

    });

    describe('#Update Project', () => {
        
        it('It should Update Project', () => {
         const project: Project =   { Name:"Test Project 2", Project_Id:0,  Priority:10, Start_Date:'02/01/2018', End_Date:'04/02/2018', Manager_Id:1 } ;
         service.UpdateProject(project).subscribe(
             data => expect(data).toEqual('Success', 'should return task'),fail
         );
         const req =httpTestingcontroller.expectOne(service.UPDATE_PROJECT_URL);
         expect(req.request.method).toEqual('POST');
         expect(req.request.body).toEqual(project);
        });

     
    });

    describe('#Delete Project', () => {
        
             it('It should delete proejct', () => {
            
            service.DeleteProject(1).subscribe(
                data => expect(data).toEqual('Success', 'should return success'),fail
            );
            const req =httpTestingcontroller.expectOne(service.DELETE_PROJECT_URL+1);
            expect(req.request.method).toEqual('POST');
            
           });
 
    });

    
});
