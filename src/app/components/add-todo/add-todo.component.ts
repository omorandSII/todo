import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TodoModel } from '../../model/todoModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'td-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public form: FormGroup;
  private formTitle: FormControl;
  private formContent: FormControl;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddTodoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TodoModel) {
    this.formTitle = new FormControl('');
    this.formTitle.setValidators(Validators.required);
    this.formContent = new FormControl('');
    this.form = this.formBuilder.group({
      'title': this.formTitle,
      'content': this.formContent
    });
  }

  ngOnInit() {
  }

  add() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
