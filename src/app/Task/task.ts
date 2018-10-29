export interface ITask {
    TaskId:number;
    Task:string;
    ParentTaskId:number;
    StartDate:string;
    EndDate:string;
    Priority:number;
}

export interface ITaskFilter {
    Task:string;
    ParentTask:string;
    PriorityFrom:number;
    PriorityTo:number;
    StartDate:string;
    EndDate:string;
}