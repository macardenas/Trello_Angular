import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ITodoModal } from 'src/app/core/interfaces/todo-interface';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
})
export class ModalTodoComponent implements OnInit {

  modeEdit: boolean = this.data.edit || false;
  formTodo: FormGroup = new FormGroup({})
  formChanged = false;

  constructor(
    public dialogRef: MatDialogRef<ModalTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodoModal
  ) { }


  ngOnInit(): void {
    this.formTodoGroup();
    this.trackFormChangesInEditMode();
  }
  formTodoGroup(): void {
    this.formTodo = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
      description: new FormControl(this.data?.description),
    });
  }

  trackFormChangesInEditMode(): void {
    if (this.modeEdit) {
      this.formTodo.valueChanges.subscribe((value) => {
        this.formChanged = (
          this.data.title !== value.title ||
          this.data.description !== value.description
        );
      });
    }
  }

  // onChangeCurrentState(newState: number): void {
  //   this.formTodo.patchValue({
  //     statusId: newState
  //   });
  // }

  saveTodo(): void {
    if (!this.formTodo.valid) return;
    this.dialogRef.close({...this.formTodo.value,id_column:this.data.id_column,id_board: this.data.id_board, id: this.data.id});
  }
}
