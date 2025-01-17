import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { state } from "@angular/animations";


// Selector para obtener el estado de los board
export const selectTodoState = (state: AppState) => state.boards;

export const selectAllBoard = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    (state) => state.boards
)