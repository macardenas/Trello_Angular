import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/interfaces/board-interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() boards: Observable<IBoard[]> = new Observable()

  constructor() { }

  ngOnInit(): void {
  }

  InitBoard(data:IBoard){
    console.log(data);
  }

}
