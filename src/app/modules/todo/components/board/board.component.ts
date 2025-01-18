import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board-interface';
import { AppState } from 'src/app/state/app.state';
import { ModalBoardComponent } from '../modal-board/modal-board.component';
import { deleteBoardRequest, updateBoardRequest } from 'src/app/state/actions/board-action';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() boards: Observable<IBoard[]> = new Observable<IBoard[]>()

  databoard: IBoard[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState> // Inyecta el servicio Store de NgRx para gestionar el estado de la aplicación
  ) { }
  ngOnInit(): void {
   this.boards.subscribe(data => this.databoard=[...data])
  }



  updateBoard(Board:IBoard){
    console.log(Board.img)
    const dialogRef = this.dialog.open(ModalBoardComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Actualizar tablero',...Board,edit:true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      //Luego de recibir la data disparo la accion para crear el tablero
      this.store.dispatch(updateBoardRequest( { board: result }));
    })
  }

  deleteBoard(Board:IBoard){
    const dialogRef = this.dialog.open(ConfirmComponent, {
          width: '400px',
          height: '200px',
          panelClass: 'my-panel-class',
          data: {
            title: 'Eliminar Tablero',
            description: '¿Está seguro que desea eliminar el Tablero?',
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (!result) return
          this.store.dispatch(deleteBoardRequest({board:Board}))
        });
  }

  trackByFn(index: number, item: any): any {
    return item.id; // o cualquier propiedad única del objeto
  }

  drop(event: CdkDragDrop<string[]>) {
   moveItemInArray( this.databoard, event.previousIndex, event.currentIndex);
  }
  
}
