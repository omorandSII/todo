import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../model/todoModel';
import { StateEnum } from '../../enum/stateEnum';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Store } from '@ngrx/store';
import { DefinitionsAction } from '../../ngRx/actions/definitions.action';

@Component({
  selector: 'td-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {

  public stateEnum = StateEnum;
  todoList: TodoModel[] = [];

  constructor(private router: Router,
              public dialog: MatDialog,
              public store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('appState').subscribe((res) => {
      this.todoList = res;
    });
  }

  isDoing(todo: TodoModel) {
    return (todo.state === StateEnum.DOING) ? true : false;
  }

  updateState(todo: TodoModel) {
    const type = (todo.state === StateEnum.DOING) ? DefinitionsAction.TODO_UNDONE : DefinitionsAction.TODO_DONE;
    this.store.dispatch({
      type: type,
      payload: todo.id
    });
  }

  getTitleClass(todo: TodoModel): string[] {
    const returnClass = ['titleTodo'];
    if (todo.state === StateEnum.DOING) {
      returnClass.push('doing');
    } else {
      returnClass.push('todo');
    }
    return returnClass;
  }

  consultTodo(todo: TodoModel): void {
    this.router.navigate(['/todo', todo.id]);
  }

  addTodo(): void {
    this.dialog.open(AddTodoComponent, {
      width: '250px',
    }).afterClosed().subscribe(result => {
      this.store.dispatch({
        type: DefinitionsAction.CREATE_TODO,
        payload: {
          title: result.title,
          content: result.content,
          state: StateEnum.TODO
        }
      });
    });
  }
}
