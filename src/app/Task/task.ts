export class Task {
    Task_Id:number;
    Task1:string;
    Parent_Id:number;
    Start_Date:string;
    End_Date:string;
    Priority:number;
    EditFlag:boolean;
}

export class TaskFilter {
    Task:string;
    ParentTask:string;
    PriorityFrom:number;
    PriorityTo:number;
    StartDate:string;
    EndDate:string;
}