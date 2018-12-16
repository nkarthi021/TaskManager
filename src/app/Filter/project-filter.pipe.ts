import { Pipe, PipeTransform } from '@angular/core'
import { formatDate } from '@angular/common';

@Pipe({
    name:'projectfilter'
})

export class ProjectFilterPipe implements PipeTransform {
    transform(projects:any, projectfilter?:any) : any {
        if(projectfilter.Project){
            projects =projects.filter(obj => obj['Name'].toLowerCase().includes(projectfilter.Project.toLowerCase()));
        }
        if (projectfilter.Manager) {
            projects = projects.filter(obj => obj['Manager'].toLowerCase().includes(projectfilter.Manager.toLowerCase()) );
        }
        if(projectfilter.PriorityFrom){
            projects = projects.filter(obj => obj['Priority']>=projectfilter.PriorityFrom);  
        }
        if(projectfilter.PriorityTo){
            projects = projects.filter(obj => obj['Priority']<=projectfilter.PriorityTo);  
        }
        if(projectfilter.StartDate){
            
            projects = projects.filter(obj => obj['StartDate'].includes(formatDate(projectfilter.StartDate,"yyyy-MM-dd","en-US")));
        }
        if(projectfilter.EndDate){
            projects = projects.filter(obj => obj['EndDate'].includes(formatDate(projectfilter.EndDate,"yyyy-MM-dd","en-US")));
        }
        return projects;
    }
}