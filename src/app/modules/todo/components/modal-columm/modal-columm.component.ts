import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IColumnModal } from 'src/app/core/interfaces/columm-interface';

@Component({
  selector: 'app-modal-columm',
  templateUrl: './modal-columm.component.html'
})
export class ModalColummComponent implements OnInit {

modeEdit = this.data.edit || false;
  formTodo: FormGroup = new FormGroup({})
  formChanged = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public dialogRef: MatDialogRef<ModalColummComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IColumnModal
  ) { }

  ngOnInit(): void {
    this.formTodoGroup();
    this.trackFormChangesInEditMode();
  }

  formTodoGroup(): void {
    this.formTodo = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required])
    });
  }

  trackFormChangesInEditMode(): void {
    if (this.modeEdit) {
      this.formTodo.valueChanges.subscribe((value) => {
        this.formChanged = (
          this.data.title !== value.title
        );
      });
    }
  }

  saveTodo(): void {
    if (!this.formTodo.valid) return;
    this.dialogRef.close(this.formTodo.value);
  }

}
