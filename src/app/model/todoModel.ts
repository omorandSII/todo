import { StateEnum } from '../enum/stateEnum';

export interface TodoModel {
  id?: number;
  title: string;
  state: StateEnum;
  content: string;
}
