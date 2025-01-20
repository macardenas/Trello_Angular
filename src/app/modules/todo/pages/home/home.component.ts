import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { Store } from '@ngrx/store'

import { createBoardRequest, getBoardsRequest, updateBoardRequest } from 'src/app/state/actions/board-action'
import { IBoard } from 'src/app/core/interfaces/board-interface'
import { selectAllBoard } from 'src/app/state/selectors/board-selector'
import { ModalBoardComponent } from '../../components/modal-board/modal-board.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  BoardAll: Observable<IBoard[]> = new Observable<IBoard[]>();

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>, // Inyecta el servicio Store de NgRx para gestionar el estado de la aplicación
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getBoardsRequest()) //Llama a la accion para obtener todos los board
    this.BoardAll = this.store.select(selectAllBoard)
   }

  createBoard(){
    const dialogRef = this.dialog.open(ModalBoardComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Crear nuevo tablero' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      //Luego de recibir la data disparo la accion para crear el tablero
      this.store.dispatch(createBoardRequest( { board: result }));
    })
  }
}
