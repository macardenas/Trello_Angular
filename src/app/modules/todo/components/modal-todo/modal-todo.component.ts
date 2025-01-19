import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ITodoModal } from 'src/app/core/interfaces/todo-interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectColumndById } from 'src/app/state/selectors/column-selector';
import { IColumn } from 'src/app/core/interfaces/columm-interface';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
})
export class ModalTodoComponent implements OnInit {

  modeEdit: boolean = this.data.edit || false;
  formTodo: FormGroup = new FormGroup({})
  formChanged = false;
  DataBoard: IColumn[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodoModal,
    private store: Store<AppState>,
  ) { }


  ngOnInit(): void {
    
    this.store.select(selectColumndById(this.data.id_board)).subscribe(boards=> {
      this.DataBoard = [...boards] 
      this.formTodoGroup();
      this.trackFormChangesInEditMode();
    });
  }
  formTodoGroup(): void {
    this.formTodo = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
      description: new FormControl(this.data?.description),
      id_column_new: new FormControl(this.data?.id_column),//
    });
  }

  trackFormChangesInEditMode(): void {
    if (this.modeEdit) {
      this.formTodo.valueChanges.subscribe((value) => {
        this.formChanged = (
          this.data.title !== value.title ||
          this.data.description !== value.description ||
          this.data.id_column !== value.id_column_new
        );
      });
    }
  }
  saveTodo(): void {
    if (!this.formTodo.valid) return;
    this.dialogRef.close({...this.formTodo.value,id_column:this.data.id_column,id_board: this.data.id_board, id: this.data.id});
  }
}
