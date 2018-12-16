export class Project {
    Project_Id:number;
    Name:string;
    Start_Date:string;
    End_Date:string;
    Priority:number;
    Manager_Id:number;
}

export class ProjectFilter {
    Project:string;
    Manager:string;
    PriorityFrom:number;
    PriorityTo:number;
    StartDate:string;
    EndDate:string
}