import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard, IBoardExport } from 'src/app/core/interfaces/board-interface';
import { AppState } from 'src/app/state/app.state';
import { ModalBoardComponent } from '../modal-board/modal-board.component';
import { deleteBoardRequest, updateBoardRequest } from 'src/app/state/actions/board-action';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { IColumn } from 'src/app/core/interfaces/columm-interface';
import { ITodo } from 'src/app/core/interfaces/todo-interface';
import { selectColumnBoardById, selectTodoBoardById } from 'src/app/state/selectors/board-selector';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {

  @Input() boards: Observable<IBoard[]> = new Observable<IBoard[]>()

  columns: Observable<IColumn[]> = new Observable<IColumn[]>();
  tasks: Observable<ITodo[]> = new Observable<ITodo[]>();
  databoard: IBoard[] = [];
  downloadJsonHref: SafeUrl | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>, // Inyecta el servicio Store de NgRx para gestionar el estado de la aplicación
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit(): void {
   this.boards.subscribe(data => this.databoard=[...data])
  }

  updateBoard(Board:IBoard){
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

  exportjsonboard(id_board:number){
    //Obtengo los datos que anidados al board que tengo actualmente
    this.columns = this.store.select(selectColumnBoardById(id_board));
    this.tasks = this.store.select(selectTodoBoardById(id_board));

    //Declaro las variables las cuales tendran la data y podran ser mutable
    let columnsdata: IColumn[] = [];
    let tasksdata: ITodo[] = [];  
    let Board: IBoard[] = this.databoard.filter(board => board.id == id_board);

    //Obtengo la data de losselect previo hecho y de desuscribo
    this.columns.subscribe((data) => columnsdata = JSON.parse(JSON.stringify(data))).unsubscribe();
    this.tasks.subscribe((data) => tasksdata = [...data]).unsubscribe();
    //Asigno las tareas a la colummnas que corresponden al board
    columnsdata.filter(columm => { columm.tasks = tasksdata.filter(task => task.id_column == columm.id)})
    
    //Armo la estructura a exportar
    let DataExport:IBoardExport ={
      ...Board[0],
      columns: [...columnsdata,],
    }

    var theJSON = JSON.stringify(DataExport);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;

  }
  
}
