import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskFilter } from '../Task/task'
import { formatDate } from '@angular/common';
//import 'rxjs/Operator/filter';


@Pipe({
    name:'viewtaskfilter'
})
export class ViewTaskFilterPipe implements PipeTransform  {
       
       transform(tasks:any, taskfilter:any ): any {
        
    //     console.log('Filter');
    //     if(!tasks){
    //         return tasks;
    //     }
       
    //    if(!Array.isArray(tasks)){
    //        return tasks;
    //    }

    //    if(tasks && Array.isArray(tasks)) {
    //        let filterkeys = Object.keys(filter);

    //        if(defaultfilter) {
    //            return tasks.filter(task => filterkeys.reduce((x, keyname) =>
    //             x && new RegExp(filter[keyname],'gi').test(task[keyname]) || filter[keyname] =="", true));
    //        }
    //        else {
    //            return tasks.filter(task => filterkeys.some((keyname) =>
    //             { return new RegExp(filter[keyname],'gi').test(task[keyname]) || filter[keyname] =="";  } ));
    //        }
//       }
    
        
        if(taskfilter.Task){
            tasks =tasks.filter(obj => obj['Task'].toLowerCase().includes(taskfilter.Task.toLowerCase()));
        }
        if (taskfilter.ParentTask) {
            tasks = tasks.filter(obj => obj['ParentTask'].toLowerCase().includes(taskfilter.ParentTask.toLowerCase()) );
        }
        if(taskfilter.PriorityFrom){
            tasks = tasks.filter(obj => obj['Priority']>=taskfilter.PriorityFrom);  
        }
        if(taskfilter.PriorityTo){
            tasks = tasks.filter(obj => obj['Priority']<=taskfilter.PriorityTo);  
        }
        if(taskfilter.StartDate){
            
            tasks = tasks.filter(obj => obj['StartDate'].includes(formatDate(taskfilter.StartDate,"yyyy-MM-dd","en-US")));
        }
        if(taskfilter.EndDate){
            tasks = tasks.filter(obj => obj['EndDate'].includes(formatDate(taskfilter.EndDate,"yyyy-MM-dd","en-US")));
        }
        return tasks;
    }
 
        
    

}