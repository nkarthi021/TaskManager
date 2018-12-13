import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Task } from '../Task/task';
import { User } from '../User/user';
import { Project } from '../Project/Project';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';

import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class SharedService {
    GET_ALL_TASK_URL:string ="http://localhost:8081/api/Task/GetTaskDetails";
    GET_TASK_BY_ID_URL:string ="http://localhost:52027/api/Task/GetTask?TaskId="
    GET_PAREENT_TASK_URL:string="http://localhost:8081/api/Task/GetTasks?TaskId=";
    ADD_TASK_URL:string="http://localhost:8081/api/Task/Create";
    //ADD_TASK_URL:string="http://localhost:52027/api/Task/Create";
    UPDATE_TASK_URL:string="http://localhost:8081/api/Task/Update";
    UPDATE_EDIT_FLAG_URL:string="http://localhost:8081/api/Task/UpdateEditFlag?TaskId=";

    GET_ALL_USERS_URL:string = "http://localhost:8081/api/User/GetUserDetails";
    GET_USER_BY_ID_URL:string = "http://localhost:8081/api/User/GetUser?UserId=";
    GET_USERS_URL:string = "http://localhost:8081/api/User/GetUsers";
    GET_MANAGER_URL:string = "http://localhost:8081/api/User/GetManagers";
    ADD_USER_URL:string = "http://localhost:8081/api/User/Create";
    UPDATE_USER_URL:string = "http://localhost:8081/api/User/Update";
    DELETE_USER_URL:string = "http://localhost:8081/api/User/Delete?UserId=";

    GET_ALL_PROJECTS_URL:string = "http://localhost:8081/api/Project/GetProjectDetails";
    GET_PROJECT_BY_ID_URL:string = "http://localhost:8081/api/Project/GetProject?ProjectId=";
    GET_PRJECTS_URL:string = "http://localhost:8081/api/Project/GetProjects";
    ADD_PROJECT_URL:string = "http://localhost:8081/api/Project/Create";
    UPDATE_PROJECT_URL:string = "http://localhost:8081/api/Project/Update";
    DELETE_PROJECT_URL:string = "http://localhost:8081/api/Project/Delete?ProjectId=";
    
    constructor(private _Http:HttpClient){ }

     // Project Services //
     GetProjectDetails(): Observable<any[]>{
        console.log('Invoking GetTaskDetils')
        // return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetTasks").pipe(map(this.extractData));
         return this._Http.get<any[]>(this.GET_ALL_PROJECTS_URL).
         pipe(catchError(this.handleError('gettasks'))) as Observable<any[]>;
     }
 
     GetProjectById(UserId:number){
         console.log('GetTaskDetailsByID');
              return this._Http.get<any>(this.GET_PROJECT_BY_ID_URL+UserId);
     
     }
 
     GetProjects() {
             return this._Http.get<any[]>(this.GET_PRJECTS_URL);
        
     }

  
     AddProject(project:Project) {
         
        return this._Http.post(this.ADD_PROJECT_URL,project, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
         // .pipe(tap(_ => console.log('Added Task TaskId:${task.Task_Id}')),
         //     catchError(this.handleError('Added Task')))
     }
 
     UpdateProject(project:Project) {
         
         return this._Http.post(this.UPDATE_PROJECT_URL,project, {
          headers: new HttpHeaders({
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'Content-Type',
              'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
           })
          });
      }

      DeleteProject(ProjectId:string) {
        
        return this._Http.post(this.DELETE_PROJECT_URL+ProjectId, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }

    // User Services //
    GetUserDetails(): Observable<any[]>{
        console.log('Invoking GetTaskDetils')
        // return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetTasks").pipe(map(this.extractData));
         return this._Http.get<any[]>(this.GET_ALL_USERS_URL).
         pipe(catchError(this.handleError('gettasks'))) as Observable<any[]>;
     }
 
     GetUserById(UserId:number){
         console.log('GetTaskDetailsByID');
              return this._Http.get<any>(this.GET_USER_BY_ID_URL+UserId);
     
     }
 
     GetUsers() {
             return this._Http.get<any[]>(this.GET_USERS_URL);
        
     }

     GetManagers() {
        return this._Http.get<any[]>(this.GET_MANAGER_URL);
 }
 
     AddUser(user:User) {
         
        return this._Http.post(this.ADD_USER_URL,user, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
         // .pipe(tap(_ => console.log('Added Task TaskId:${task.Task_Id}')),
         //     catchError(this.handleError('Added Task')))
     }
 
     UpdateUser(user:User) {
         
         return this._Http.post(this.UPDATE_USER_URL,user, {
          headers: new HttpHeaders({
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'Content-Type',
              'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
           })
          });
      }

      DeleteUser(UserId:string) {
        
        return this._Http.post(this.DELETE_USER_URL+UserId, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }

    // Task Services //
    GetTaskDetails(): Observable<any[]>{
       console.log('Invoking GetTaskDetils')
       // return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetTasks").pipe(map(this.extractData));
        return this._Http.get<any[]>(this.GET_ALL_TASK_URL).
        pipe(catchError(this.handleError('gettasks'))) as Observable<any[]>;
    }

    GetTaskDetailsByTaskId(TaskId:number){
        console.log('GetTaskDetailsByID');
        this.GET_TASK_BY_ID_URL = this.GET_TASK_BY_ID_URL+TaskId
        return this._Http.get<any>(this.GET_TASK_BY_ID_URL);
    
    }

    GetParentTask(taskId:number) {
        
        this.GET_PAREENT_TASK_URL = this.GET_PAREENT_TASK_URL+taskId;
        //return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetParentTask?TaskId="+ taskId +"").pipe(map(this.extractData));
        return this._Http.get<any[]>(this.GET_PAREENT_TASK_URL);
       
    }

    AddTaskDetails(task:Task) {
        
       return this._Http.post(this.ADD_TASK_URL,task, {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type',
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
         })
        });
        // .pipe(tap(_ => console.log('Added Task TaskId:${task.Task_Id}')),
        //     catchError(this.handleError('Added Task')))
    }

    UpdateTaskDetails(task:Task) {
        
        return this._Http.post(this.UPDATE_TASK_URL,task, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }

     UpdateEditFlag(TaskId:number, EditFlag:boolean) {
       
        return this._Http.post(this.UPDATE_EDIT_FLAG_URL+TaskId+"&EditFlag="+EditFlag, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }

     private handleError<T> (operation = 'operation') {
        return(error : HttpErrorResponse): Observable<T> => {
            console.error(error);

            const message = (error.error instanceof ErrorEvent) ?
            error.error.message :
            `Server retrurned code ${error.status} with body ${error.error}`;

            throw new Error(`${operation} failed ${message}`);
        }
     }
}