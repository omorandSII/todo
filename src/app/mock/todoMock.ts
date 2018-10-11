import { TodoModel } from '../model/todoModel';
import { StateEnum } from '../enum/stateEnum';

let id = 0;

export const todoListMock: TodoModel[] = [
  {
    id: id++,
    title: 'Ramasser du bois',
    state: StateEnum.TODO,
    content: 'Aller chercher du bois dans la forêt'
  },
  {
    id: id++,
    title: 'Entasser le bois',
    state: StateEnum.TODO,
    content: 'Préparer le foyer en entassant le bois'
  },
  {
    id: id++,
    title: 'Allumer le feu',
    state: StateEnum.TODO,
    content: 'Craquer l\'allumette et la mettre dans le tas de bois'
  },
];
