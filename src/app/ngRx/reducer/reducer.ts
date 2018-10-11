import { TodoModel } from '../../model/todoModel';
import { ActionType, DefinitionsAction } from '../actions/definitions.action';
import { StateEnum } from '../../enum/stateEnum';

class ReducerFunction {

  static appState(state: TodoModel[] = [], action: ActionType): TodoModel[] {
    let returnState = state;
    switch (action.type) {
      case DefinitionsAction.CREATE_TODO: {
        action.payload.id = state.length;
        returnState = state.concat(action.payload);
        break;
      }
      case DefinitionsAction.TODO_DONE: {
        returnState = [...state];
        returnState[action.payload].state = StateEnum.DOING;
        break;
      }
      case DefinitionsAction.TODO_UNDONE: {
        returnState = [...state];
        returnState[action.payload].state = StateEnum.TODO;
        break;
      }
      case DefinitionsAction.LOAD: {
        if (localStorage.appState) {
          const localData = JSON.parse(localStorage.appState);
          if (localData.length) {
            returnState = state.concat(localData);
          }
        }
        break;
      }
      case DefinitionsAction.RESET: {
        returnState = [];
        break;
      }
    }

    if (state !== returnState) {
      localStorage.appState = JSON.stringify(returnState);
    }
    return returnState;
  }
}



export const reducers = {
  appState: ReducerFunction.appState
};

