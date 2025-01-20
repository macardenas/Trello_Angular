import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { TodoRoutingModule } from './todo-routing.module'
import { TodoItemComponent } from './components/todo-item/todo-item.component'
import { HomeComponent } from './pages/home/home.component'
import { ModalTodoComponent } from './components/modal-todo/modal-todo.component'
import { MaterialModule } from './material.module'
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component'
import { GenericInformationComponent } from './components/dialogs/generic-information/generic-information.component'
import { BoardComponent } from './components/board/board.component';
import { ModalBoardComponent } from './components/modal-board/modal-board.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { ModalColummComponent } from './components/modal-columm/modal-columm.component'

@NgModule({
  declarations: [
    TodoItemComponent,
    HomeComponent,
    ModalTodoComponent,
    ConfirmComponent,
    GenericInformationComponent,
    BoardComponent,
    ModalBoardComponent,
    BoardDetailComponent,
    ModalColummComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    MaterialModule
  ],
  providers: []
})
export class TodoModule { }
