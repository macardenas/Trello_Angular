import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import { ITodo, Todo } from 'src/app/core/interfaces/todo-interface';
// import { TodoService } from '../../../../services/todo.service';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { IColumn } from 'src/app/core/interfaces/columm-interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { createTodoRequest, deleteTodoRequest, getTodosRequest, updateTodoRequest } from 'src/app/state/actions/todo-actions';
import { selectTodosColumns } from 'src/app/state/selectors/todo-selectors';
import { deleteColumnRequest, updateColumnRequest } from 'src/app/state/actions/column-action';
import { ModalColummComponent } from '../modal-columm/modal-columm.component';
import { CdkDragDrop, moveItemInArray,  CdkDropList, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';
// import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: []
})
export class TodoItemComponent implements OnInit {

  @Input() Column: Observable<IColumn[]> = new Observable<IColumn[]>;
  @Input() id_board: number = 0;
  searchTerm: string = '';
    
  TaksItems: Observable<ITodo[]> = new Observable<ITodo[]>();
  DataColumn: IColumn[] = [];
  DataTodo: ITodo[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodosRequest());
    this.TaksItems = this.store.select(selectTodosColumns(this.id_board));
    this.Column.subscribe(data => this.DataColumn = [...data]); //Subscribo la data a una variable para poder usar el drag and drop y hago una copia de la data
    this.TaksItems.subscribe( data=> this.DataTodo = [...data]);
  }

  deleteTodo(task:ITodo) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      height: '200px',
      panelClass: 'my-panel-class',
      data: {
        title: 'Eliminar tarea',
        description: '¿Está seguro que desea eliminar la tarea?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.store.dispatch(deleteTodoRequest({todo:task}))

    });
  }

  deleteColumn(task:IColumn) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      height: '200px',
      panelClass: 'my-panel-class',
      data: {
        title: 'Eliminar Columna',
        description: '¿Está seguro que desea eliminar la Columna?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.store.dispatch(deleteColumnRequest({column:task}))
    });
  }

  createTodo(InfoColumn:IColumn){
    const dialogRef = this.dialog.open(ModalTodoComponent, {
        width: '500px',
        height: '400px',
        panelClass: 'my-panel-class',
        data: { titleModal: 'Crear nueva tarea',id_column:InfoColumn.id, id_board:InfoColumn.id_board }
    })

    dialogRef.afterClosed().subscribe((result: ITodo) => {
        if (!result) return
        //Luego de recibir la data disparo la accion para crear la tarea
      this.store.dispatch(createTodoRequest({ todo: result }));
    })
}
  //Actualizo los nuevos valores del TODO
  updateStatus(task:ITodo) {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Actualizar tarea',...task, edit:true }
    })

    dialogRef.afterClosed().subscribe((result: ITodo) => {
        if (!result) return
        //Luego de recibir la data disparo la accion para crear la tarea
      this.store.dispatch(updateTodoRequest({ todo: result }));
    })
  }

  updateColumn(InfoColumn:IColumn) {
    const dialogRef = this.dialog.open(ModalColummComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Actualizar columna',...InfoColumn, edit:true }
    })

    dialogRef.afterClosed().subscribe((result: ITodo) => {
        if (!result) return
        //Luego de recibir la data disparo la accion para actualizar la tarea
        this.store.dispatch(updateColumnRequest({ column: result }));
    })
  }
  //Para dar un ID unico al valor en el html para el ciclo for para una mejor identifacion
  trackByFn(index: number, item: any): any {
    return item.id; // o cualquier propiedad única del objeto
  }
  //Con esto puedo mover las tareas
  drop(event: CdkDragDrop<string[]>,type:string) {
     moveItemInArray<ITodo | IColumn>( type =='column' ? this.DataColumn : this.DataTodo, event.previousIndex, event.currentIndex);
  }
  //Con esto puedo mover las tareas entre columnas
  dropcolumns(event: CdkDragDrop<ITodo[]>) {
    
    console.log(
      event.previousContainer.data,
      event.previousIndex
    )

    console.log(
      event.container.data,
      event.currentIndex
    )

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  //Me permite filtrar por tareas
  filterTasks(): ITodo[] { 
    return this.DataTodo.filter(task => task.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  onSearch(event: Event): void { 
    this.searchTerm = (event.target as HTMLInputElement).value; 
  }
}
