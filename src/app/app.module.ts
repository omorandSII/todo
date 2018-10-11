import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayListComponent } from './components/display-list/display-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FilterStatePipe } from './pipe/filterState';
import { DisplayTodoComponent } from './components/display-todo/display-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './pipe/reverse';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from './ngRx/reducer/reducer';
import { DefinitionsAction } from './ngRx/actions/definitions.action';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/listTodo',
    pathMatch: 'full'
  },
  {
    path: 'listTodo',
    component: DisplayListComponent
  },
  {
    path: 'todo/:id',
    component: DisplayTodoComponent
  }
];

@NgModule({
  entryComponents: [
    AddTodoComponent
  ],
  declarations: [
    AppComponent,
    DisplayListComponent,
    FilterStatePipe,
    ReversePipe,
    DisplayTodoComponent,
    AddTodoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private store: Store<any>) {
    this.store.dispatch({type: DefinitionsAction.LOAD});
  }
}
