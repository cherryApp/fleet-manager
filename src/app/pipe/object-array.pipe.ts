import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectArray'
})
export class ObjectArrayPipe implements PipeTransform {

  transform(value: any[], phrase: string = "", key: string = ""): any {
    if (!phrase) {
      return value;
    }

    phrase = phrase.toLowerCase();
    return value.filter( val => {      
      if (!key || key == 'notset') {
        let isOk: boolean = false;
        for (let k in val) {
          let check = val[k].toString().toLowerCase();
          if (check.indexOf(phrase) > -1) {
            isOk = true;
          }
        }
        return isOk;
      } else {
        let check = val[key].toString().toLowerCase();
        return check.indexOf(phrase) > -1;
      }
    });
  }

}
