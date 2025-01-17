import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


// Selector para obtener el estado de los board
export const selectTodoState = (state: AppState) => state.boards;

export const selectAllBoard = createSelector(
    selectTodoState, // Selecciona el estado de los board
    (state) => state.boards
)

// selector with param
export const selectBoardById = (BoardID: number) =>
    createSelector(
        selectTodoState, // Selecciona el estado de los board
        (state) => state.boards.filter(item => item.id == BoardID)
    )
