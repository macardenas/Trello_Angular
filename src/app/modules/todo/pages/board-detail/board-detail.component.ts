import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board-interface';
import { getBoardsRequest } from 'src/app/state/actions/board-action';
import { AppState } from 'src/app/state/app.state';
import { selectBoardById } from 'src/app/state/selectors/board-selector';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
})
export class BoardDetailComponent implements OnInit  {

  Board: Observable<IBoard[]> = new Observable<IBoard[]>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private _router: ActivatedRoute,
              private store: Store<AppState>
  ) {
    this.store.dispatch(getBoardsRequest()) //Llama a la accion para obtener todos los board
    const id = Number(this._router.snapshot.paramMap.get('id'));
    if(!id) return;
    this.Board = this.store.select(selectBoardById(id))
    this.Board.subscribe((data)=>console.log(data));
   }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }





}
