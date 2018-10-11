import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../model/todoModel';
import { StateEnum } from '../enum/stateEnum';

@Pipe({
  name: 'filterState',
  pure: false
})
export class FilterStatePipe implements PipeTransform {
  transform(array: TodoModel[]): TodoModel[] {
    const arrayReturn: TodoModel[] = array.filter((value: TodoModel) => value.state === StateEnum.TODO);
    return arrayReturn.concat(array.filter((value: TodoModel) => value.state === StateEnum.DOING));
  }
}
