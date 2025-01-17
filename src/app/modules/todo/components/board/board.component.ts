import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board-interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @Input() boards: Observable<IBoard[]> = new Observable<IBoard[]>()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }



  InitBoard(data:IBoard){
    console.log(data);
  }

}
