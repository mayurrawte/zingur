import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWithUser'
})
export class ReplaceWithUserPipe implements PipeTransform {

  transform(value: any, user: string): any {
    const str = value.split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].replace(/\byour\b/, user + '\'s');
      str[i] = str[i].replace(/\bYour\b/, user + '\'s');
      str[i] = str[i].replace(/\byou\b/, user);
    }
    return str.join(' ');
  }
}
