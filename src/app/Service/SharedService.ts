import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task/task';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SharedService {
   
    // private extractData(res:Response) {
    //     let body = res;
    //     return body || {};
    // }
    constructor(private _Http:HttpClient){ }

    GetTaskDetails(){
       
       // return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetTasks").pipe(map(this.extractData));
        return this._Http.get<any[]>("http://localhost:8081/api/TaskManagerAPI/GetTasks");
    }

    GetTaskDetailsByTaskId(TaskId:number){
       
        return this._Http.get<any>("http://localhost:8081/api/TaskManagerAPI/GetTask?TaskId="+ TaskId);
    }

    GetParentTask(taskId:number) {
        //return this._Http.get("http://localhost:8081/api/TaskManagerAPI/GetParentTask?TaskId="+ taskId +"").pipe(map(this.extractData));
        return this._Http.get<any[]>("http://localhost:8081/api/TaskManagerAPI/GetParentTask?TaskId="+ taskId +"");
        
    }

    AddTaskDetails(task:Task) {
        
       return this._Http.post("http://localhost:8081/api/TaskManagerAPI/Create",task, {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type',
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
         })
        });
    }

    UpdateTaskDetails(task:Task) {
        
        return this._Http.post("http://localhost:8081/api/TaskManagerAPI/Update",task, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }

     UpdateEditFlag(TaskId:number, EditFlag:boolean) {
        
        return this._Http.post("http://localhost:8081/api/TaskManagerAPI/UpdateEditFlag?TaskId="+TaskId+"&EditFlag="+EditFlag, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }
}