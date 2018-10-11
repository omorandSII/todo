import { Action } from '@ngrx/store';

export type ActionType = CreateTodoAction | TodoDoneAction | TodoUnDoneAction | LoadAction | ResetAction;

export enum DefinitionsAction {
  TODO_DONE = 'TODO_DONE',
  TODO_UNDONE = 'TODO_UNDONE',
  CREATE_TODO = 'CREATE_TODO',
  LOAD = 'LOAD',
  RESET = 'RESET'
}

export class CreateTodoAction implements Action {
  readonly type = DefinitionsAction.CREATE_TODO;

  constructor(public payload: any) { }
}

export class LoadAction implements Action {
  readonly type = DefinitionsAction.LOAD;
}

export class TodoDoneAction implements Action {
  readonly type = DefinitionsAction.TODO_DONE;

  constructor(public payload: any) { }
}

export class TodoUnDoneAction implements Action {
  readonly type = DefinitionsAction.TODO_UNDONE;

  constructor(public payload: any) { }
}

export class ResetAction implements Action {
  readonly type = DefinitionsAction.RESET;
}
