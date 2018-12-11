import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Task } from '../Task/task';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';

import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class SharedService {
    GET_ALL_TASK_URL:string ="http://localhost:8081/api/TaskManagerAPI/GetTasks";
    GET_TASK_BY_ID_URL:string ="http://localhost:8081/api/TaskManagerAPI/GetTask?TaskId="
    GET_PAREENT_TASK_URL:string="http://localhost:8081/api/TaskManagerAPI/GetParentTask?TaskId=";
    ADD_TASK_URL:string="http://localhost:8081/api/TaskManagerAPI/Create";
    UPDATE_TASK_URL:string="http://localhost:8081/api/TaskManagerAPI/Update";
    UPDATE_EDIT_FLAG_URL:string="http://localhost:8081/api/TaskManagerAPI/UpdateEditFlag?TaskId=";
    
    constructor(private _Http:HttpClient){ }

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