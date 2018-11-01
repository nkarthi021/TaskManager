import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITask } from '../Task/task';

@Injectable()
export class SharedService {
   
    constructor(private _Http:HttpClient){ }

    GetTaskDetails(){
       
        return this._Http.get<any[]>("http://localhost:59408/api/TaskAPI/GetTasks");
    }

    GetParentTask(taskId:number) {
        return this._Http.get<any[]>("http://localhost:59408/api/TaskAPI/GetParentTask?TaskId="+ taskId +"");
        
    }

    AddTaskDetails(task:ITask) {
        
       return this._Http.post("http://localhost:59408/api/TaskAPI/Create",task, {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type',
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
         })
        });
    }
}