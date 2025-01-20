import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import { ITodo, ITodoModal } from 'src/app/core/interfaces/todo-interface';
import { Observable, Subscription } from 'rxjs';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { IColumn } from 'src/app/core/interfaces/columm-interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { createTodoRequest, deleteTodoRequest, getTodosRequest, updateTodoRequest } from 'src/app/state/actions/todo-actions';
import { selectTodosColumns } from 'src/app/state/selectors/todo-selectors';
import { deleteColumnRequest, updateColumnRequest } from 'src/app/state/actions/column-action';
import { ModalColummComponent } from '../modal-columm/modal-columm.component';
import { CdkDragDrop, moveItemInArray,  CdkDropList, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: []
})
export class TodoItemComponent implements OnInit, OnDestroy {

  @Input() Column: Observable<IColumn[]> = new Observable<IColumn[]>;
  @Input() id_board: number = 0;
  searchTerm: string = '';
    
  TaksItems: Observable<ITodo[]> = new Observable<ITodo[]>();
  DataColumn: IColumn[] = [];
  DataTodo: ITodo[] = [];

  private columnSubscription!: Subscription;
  private tasksSubscription!: Subscription;



  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodosRequest());
    this.TaksItems = this.store.select(selectTodosColumns(this.id_board));
    //Lo declaro de esta manera para luego de destruir el componente desuscribo estos observable
    this.columnSubscription= this.Column.subscribe(data => this.DataColumn = [...data]); //Subscribo la data a una variable para poder usar el drag and drop y hago una copia de la data
    this.tasksSubscription= this.TaksItems.subscribe( data=> this.DataTodo = [...data]);
  }

  ngOnDestroy(): void {
    this.columnSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
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

    dialogRef.afterClosed().subscribe((result: ITodoModal) => {
        if (!result) return
        //Con esto valido si la nueva columna que me llega diferente a la actual la actualizo
        if( result.id_column_new != undefined && result.id_column != result.id_column_new){ console.log("entreee"); result.id_column = Number(result.id_column_new)};
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
  //Le da el valor a la variable para filtrar
  onSearch(event: Event): void { 
    this.searchTerm = (event.target as HTMLInputElement).value; 
  }
}
