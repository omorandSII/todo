import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatFormFieldModule, MAT_DIALOG_DATA } from '@angular/material';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let element;

  const spyMatDialofRef = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: spyMatDialofRef},
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it('should create component AddTodoComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as variable form`, async(() => {
    expect(component.form).toBeDefined();
    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('content')).toBeTruthy();
  }));

  it('should have a div to display title', async(() => {
    expect(element.getElementsByTagName('mat-form-field').length).toEqual(2);
    expect(element.getElementsByTagName('button').length).toEqual(1);
  }));

  it('should add methode', () => {
    expect(component.add).toBeDefined();
  });

});
