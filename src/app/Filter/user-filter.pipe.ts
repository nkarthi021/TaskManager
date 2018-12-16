import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: any, userfilter?: any): any {
     if(userfilter.FirstName){
            users =users.filter(obj => obj['FirstName'].toLowerCase().includes(userfilter.FirstName.toLowerCase()));
        }
        if (userfilter.LastName) {
            users = users.filter(obj => obj['LastName'].toLowerCase().includes(userfilter.LastName.toLowerCase()) );
        }
        
        return users;
  }

}
