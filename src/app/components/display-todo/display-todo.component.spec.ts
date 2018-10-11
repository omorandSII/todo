import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTodoComponent } from './display-todo.component';
import { DefinitionsAction } from '../../ngRx/actions/definitions.action';
import { todoListMock } from '../../mock/todoMock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDialog, MatDialogModule, MatIconModule, MatListModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from '../../ngRx/reducer/reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { of } from 'rxjs';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { StateEnum } from '../../enum/stateEnum';

describe('DisplayTodoComponent', () => {

  @Component({template: '<router-outlet></router-outlet>'})
  class AddTodoComponent {
  }

  const testRoutes: Routes = [
    {path: '', component: AddTodoComponent},
    {path: 'todo/:id', component: AddTodoComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ];

  let component: DisplayTodoComponent;
  let fixture: ComponentFixture<DisplayTodoComponent>;
  let element;

  const routerSpy = {
    ...jasmine.createSpyObj('ActivatedRoute', ['test']),
    params: of({id: 0}),
  } as jasmine.SpyObj<ActivatedRoute>;


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
        MatDialog,
        {provide: ActivatedRoute, useValue: routerSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DisplayTodoComponent, AddTodoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayTodoComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    component.store.dispatch({'type': DefinitionsAction.RESET});
    component.store.dispatch({'type': DefinitionsAction.CREATE_TODO, 'payload': todoListMock[0]});
  }));

  afterEach(async(() => {
    component.store.dispatch({'type': DefinitionsAction.TODO_UNDONE, 'payload': 0});
  }));

  it('should constructor method', async(() => {
    fixture.detectChanges();
    expect(component.localData).toEqual(todoListMock[0]);
    expect(component.localData).not.toEqual(todoListMock[1]);
    expect(component).toBeTruthy();
  }));

  it('should done method', async(() => {
    fixture.detectChanges();
    expect(component.localData.state).toEqual(StateEnum.TODO);
    expect(component.localData.state).not.toEqual(StateEnum.DOING);
    component.done();
    expect(component.localData.state).not.toEqual(StateEnum.TODO);
    expect(component.localData.state).toEqual(StateEnum.DOING);
  }));

  it('should have a elements', async(() => {
    fixture.detectChanges();
    expect(element.getElementsByTagName('button').length).toEqual(2);
    expect(element.getElementsByTagName('h2').length).toEqual(1);
    expect(element.querySelectorAll('DIV.contentDialog').length).toEqual(1);
  }));

});
