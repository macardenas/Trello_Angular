import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board-interface';
import { getBoardsRequest } from 'src/app/state/actions/board-action';
import { AppState } from 'src/app/state/app.state';
import { selectBoardById } from 'src/app/state/selectors/board-selector';
import { ModalColummComponent } from '../../components/modal-columm/modal-columm.component';
import { createColumnRequest, getColumnsRequest } from 'src/app/state/actions/column-action';
import { IColumn } from 'src/app/core/interfaces/columm-interface';
import { selectColumndById } from 'src/app/state/selectors/column-selector';
import { ModalTodoComponent } from '../../components/modal-todo/modal-todo.component';
import { getTodosRequest } from 'src/app/state/actions/todo-actions';
import { selectTodosColumns } from 'src/app/state/selectors/todo-selectors';
import { ITodo } from 'src/app/core/interfaces/todo-interface';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
})
export class BoardDetailComponent implements OnInit  {

  idBoard = 0;
  DataBoard: IBoard[] = [];
  Board: Observable<IBoard[]> = new Observable<IBoard[]>();
  Column: Observable<IColumn[]> = new Observable<IColumn[]>();
  Taks: Observable<ITodo[]> = new Observable<ITodo[]>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private _router: ActivatedRoute,
              private store: Store<AppState>,
              private dialog: MatDialog
  ) {
        this.store.dispatch(getBoardsRequest()) //Llama a la accion para obtener todos los board
        this.idBoard = Number(this._router.snapshot.paramMap.get('id'));
        if(!this.idBoard) return;
        this.Board = this.store.select(selectBoardById(this.idBoard))
        this.Board.subscribe(data=> this.DataBoard = [...data]);
    }

    ngOnInit(): void {
        this.store.dispatch(getColumnsRequest())
        this.Column = this.store.select(selectColumndById(this.idBoard))
    }

    createColumn(){
        const dialogRef = this.dialog.open(ModalColummComponent, {
            width: '500px',
            height: '400px',
            panelClass: 'my-panel-class',
            data: { titleModal: 'Crear nueva Columna' }
        })

        dialogRef.afterClosed().subscribe((result: IColumn) => {
            if (!result) return
            //Luego de recibir la data disparo la accion para crear el tablero
            result.id_board = this.idBoard;
            this.store.dispatch(createColumnRequest( { column: result }));
        })
    }
}
