import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task/task';

@Injectable()
export class SharedService {
   
    constructor(private _Http:HttpClient){ }

    GetTaskDetails(){
       
        return this._Http.get<any[]>("http://localhost:50082/api/TaskAPI/GetTasks");
    }

    GetTaskDetailsByTaskId(TaskId:number){
       
        return this._Http.get<any>("http://localhost:50082/api/TaskAPI/GetTask?TaskId="+ TaskId);
    }

    GetParentTask(taskId:number) {
        return this._Http.get<any[]>("http://localhost:50082/api/TaskAPI/GetParentTask?TaskId="+ taskId +"");
        
    }

    AddTaskDetails(task:Task) {
        
       return this._Http.post("http://localhost:50082/api/TaskAPI/Create",task, {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type',
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
         })
        });
    }

    UpdateTaskDetails(task:Task) {
        
        return this._Http.post("http://localhost:50082/api/TaskAPI/Update",task, {
         headers: new HttpHeaders({
             'Access-Control-Allow-Origin':'*',
             'Access-Control-Allow-Headers':'Content-Type',
             'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
          })
         });
     }
}