import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../model/todoModel';
import { ActivatedRoute, Router } from '@angular/router';
import { StateEnum } from '../../enum/stateEnum';
import { Store } from '@ngrx/store';
import { DefinitionsAction } from '../../ngRx/actions/definitions.action';

@Component({
  selector: 'td-display-todo',
  templateUrl: './display-todo.component.html',
  styleUrls: ['./display-todo.component.scss']
})
export class DisplayTodoComponent implements OnInit {

  public localData: TodoModel;

  constructor(private route: ActivatedRoute, public store: Store<any>, private router: Router) {
    this.route.params.subscribe((params) => {
      this.store.select('appState').subscribe((res) => {
        this.localData = res[params.id];
      });
    });
  }

  ngOnInit() {
  }

  done() {
    this.store.dispatch({
      type: DefinitionsAction.TODO_DONE,
      payload: this.localData.id
    });
    this.router.navigate(['/listTodo']);
  }

  cancel() {
    this.router.navigate(['/listTodo']);
  }
}
