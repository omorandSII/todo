import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { DisplayListComponent } from './display-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatCheckboxModule, MatDialog, MatDialogContainer,
  MatDialogModule, MatDialogRef,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { FilterStatePipe } from '../../pipe/filterState';
import { ReversePipe } from '../../pipe/reverse';
import { Store, StoreModule } from '@ngrx/store';
import { todoListMock } from '../../mock/todoMock';
import { TodoModel } from '../../model/todoModel';
import { StateEnum } from '../../enum/stateEnum';
import { reducers } from '../../ngRx/reducer/reducer';
import { DefinitionsAction } from '../../ngRx/actions/definitions.action';
import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({template: ''})
class AddTodoComponent {
}

describe('DisplayListComponent', () => {

  const testRoutes: Routes = [
    {
      path: '',
      component: AddTodoComponent
    },
    {
      path: 'todo/:id',
      component: AddTodoComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ];

  let component: DisplayListComponent;
  let fixture: ComponentFixture<DisplayListComponent>;
  let element;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatDialogModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule.withRoutes(testRoutes)
      ],
      providers: [
        Store,
        MatDialog
      ],
      declarations: [DisplayListComponent, FilterStatePipe, ReversePipe, AddTodoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayListComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    component.store.dispatch({'type': DefinitionsAction.RESET});
    component.store.dispatch({'type': DefinitionsAction.CREATE_TODO, 'payload': todoListMock[0]});
    router = TestBed.get(Router);

  }));

  afterEach(async(() => {
    component.store.dispatch({'type': DefinitionsAction.TODO_UNDONE, 'payload': 0});
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method ngOnInit', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.todoList[0]).toEqual(todoListMock[0]);
    expect(component.todoList[0]).not.toEqual(todoListMock[1]);

  }));

  it('method isdoing', async(() => {
    fixture.detectChanges();
    const test1 = {state: StateEnum.DOING};
    const test2 = {state: StateEnum.TODO};
    expect(component.isDoing(test1 as TodoModel)).toBeTruthy();
    expect(component.isDoing(test2 as TodoModel)).not.toBeTruthy();
  }));

  it('method updateState', async(() => {
    // case => done
    component.store.dispatch({'type': DefinitionsAction.TODO_DONE, 'payload': 0});
    fixture.detectChanges();
    expect(component.todoList[0].state).toEqual(StateEnum.DOING);
    expect(component.todoList[0].state).not.toEqual(StateEnum.TODO);
    // case => undone
    component.store.dispatch({'type': DefinitionsAction.TODO_UNDONE, 'payload': 0});
    fixture.detectChanges();
    expect(component.todoList[0].state).toEqual(StateEnum.TODO);
    expect(component.todoList[0].state).not.toEqual(StateEnum.DOING);
  }));

  it('method getTitleClass', async(() => {
    fixture.detectChanges();
    // case todo
    expect(component.getTitleClass(component.todoList[0])).toEqual(['titleTodo', 'todo']);
    expect(component.getTitleClass(component.todoList[0])).not.toEqual(['titleTodo', 'doing']);
    // case doing
    component.store.dispatch({'type': DefinitionsAction.TODO_DONE, 'payload': 0});
    expect(component.getTitleClass(component.todoList[0])).toEqual(['titleTodo', 'doing']);
    expect(component.getTitleClass(component.todoList[0])).not.toEqual(['titleTodo', 'todo']);
  }));

  it('should have a elements', async(() => {
    fixture.detectChanges();
    expect(element.getElementsByTagName('button').length).toEqual(1);
    expect(element.getElementsByTagName('mat-list-item').length).toEqual(1);
  }));

});
