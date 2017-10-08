import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWithUser'
})
export class ReplaceWithUserPipe implements PipeTransform {

  transform(value: any, user: string): any {
    const str = value.split(' ');
    for (let i = 0; i < str.length; i++) {
      console.log(str[i]);
      str[i] = str[i].replace(/\byou\b/, user);
      str[i] = str[i].replace(/\byour\b/, user + '\'s');
    }
    return str.join(' ');
  }
}
